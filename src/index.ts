// const http = require("http");
// const fs = require("fs");
// const { resolve } = require("path");
// const { rejects } = require("assert");

// const port = 3003;
// const delay = (ms) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, ms);
//   });
// };

// const readFile = (path) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, (err, data) => {
//       if (err) reject(err);
//       else resolve(data);
//     });
//   });
// };

// const server = http.createServer(async (request, response) => {
//   //                                 node server.js
//   switch (request.url) {
//     case "/home": {
//       try {
//         const data = await readFile("pages/about.html");
//         response.write(data);
//         response.end();
//       } catch (err) {
//         response.write("Error, 500");
//         response.end();
//       }
//       break;
//     }

//     case "/":

//     case "/about": {
//       await delay(3000);
//       response.write("About Course");
//       response.end();
//       break;
//     }

//     default:
//       response.write("404 not found ");
//       response.end();
//   }
// });

// server.listen(port, () => {
//   console.log(`Server ${3003} is running`);
// });

// /* ASYNC */
// const getUser = async () => {
//   return {
//     username: "Tomek2020",
//     lvl: 20,
//   };
// };

// const getRoom = async () => {
//   return {
//     room: 200,
//     floor: 2,
//   };
// };

// const age = 16;

// const shouldBuyABeer = new Promise((res, rej) => {
//   if (age >= 18) {
//     res("You can buy it");
//   } else {
//     rej('You can"t buy it');
//   }
// });

// /* Promises */
// getUser()
//   .then((data) => {
//     console.log("Data Promises: ", data);
//     getRoom()
//       .then((value) => console.log("Room: ", value))
//       .catch((errRoom) => console.error("Error: ", errRoom));
//   })
//   .catch((err) => console.error("Error: ", err))(
//   /* Try / catch */
//   async () => {
//     try {
//       const response = await getUser();
//       const responseSecond = await getRoom();

//       console.log("Data try/catch: ", response, responseSecond);

//       const beer = await shouldBuyABeer;
//       console.log("Beer: ", beer);
//     } catch (err) {
//       console.error("Something went wrong MainView getUser: ", err);
//     }
//   }
// )();

import express, { Request, Response, Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "./types";
import { CourseCreateModel } from "./models/CourseCreateModel";
import { CourseUpdateModel } from "./models/CourseUpdateModel";
import { CoursesQueryModel } from "./models/GetCourseQueryModel";
import { CourseViewModel } from "./models/CourseViewModel";
import { URIParamsCourseIDModel } from "./models/URIParamsCourseIDModel";
//import  {  } from "express";
//const express = require("express");

const port = process.env.Port || 5000;
export const app: Express = express();

const corsMiddleware = cors();
app.use(corsMiddleware);
const jsonBodyMiddleware = bodyParser.json();
app.use(jsonBodyMiddleware);

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

type CourseType = {
  id: number;
  title: string;
  studentsCount: number;
  //message?: string
};

const db: { courses: CourseType[] } = {
  courses: [
    { id: 1, title: "front-end", studentsCount: 10 },
    { id: 2, title: "back-end", studentsCount: 10 },
    { id: 3, title: "authomation", studentsCount: 10 },
    { id: 4, title: "devops", studentsCount: 10 },
  ],
};

const getCourseVievModel = (dbCourse: CourseType): CourseViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
  };
};

const products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];

const addresses = [
  { id: 1, value: "Independence 21" },
  { id: 2, value: "Salers 11" },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Hello IT !!!");
  // res.status(200).json({message: "Got post", data: })
});

app.get(
  "/courses",
  (
    req: RequestWithQuery<CoursesQueryModel>,
    res: Response<CourseViewModel[]>
  ) => {
    let foundCourses = db.courses;

    if (req.query.title) {
      res.send(
        (foundCourses = foundCourses.filter(
          (c) => c.title.indexOf(req.query.title as string) > -1
        ))
      );
    } else {
      res.send(foundCourses.map(getCourseVievModel));
    }
    //res.status(HTTP_STATUSES.OK_200).json(foundCourses);
  }
);

app.get(
  "/courses/:id",
  (
    req: RequestWithParams<URIParamsCourseIDModel>,
    res: Response<CourseViewModel>
  ) => {
    const foundCourse = db.courses.find((c) => c.id === +req.params.id);
    if (!foundCourse) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    res.json(getCourseVievModel(foundCourse));
  }
);

app.post(
  "/courses",
  (
    req: RequestWithBody<CourseCreateModel>,
    res: Response<CourseViewModel> //{ data: CourseViewModel; message: string }
  ) => {
    if (!req.body.title) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }

    const createdCourse: CourseType = {
      id: +new Date(),
      title: req.body.title,
      studentsCount: 0,
    };
    db.courses.push(createdCourse);

    res
      .status(HTTP_STATUSES.CREATED_201)
      .json(getCourseVievModel(createdCourse));
  }
);

app.delete(
  "courses/:id",
  (req: RequestWithParams<URIParamsCourseIDModel>, res: Response) => {
    db.courses = db.courses.filter((c) => c.id !== +req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  }
);

app.put(
  "/courses/:id",
  (
    req: RequestWithParamsAndBody<URIParamsCourseIDModel, CourseUpdateModel>,
    res: Response
  ) => {
    if (!req.body.title) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }

    const foundCourse = db.courses.find((c) => c.id === +req.params.id);
    if (!foundCourse) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    foundCourse.title = req.body.title;

    res.status(HTTP_STATUSES.OK_200).json(foundCourse);
  }
);

////////////////////////////////////////////////////////////
app.get("/products", (req: Request, res: Response) => {
  let foundProducts = products;
  if (req.query.title) {
    res.send(
      products.filter((p) => p.title.indexOf(req.query.title as string) > -1)
    );
  } else {
    res.send(foundProducts);
  }
  res.status(HTTP_STATUSES.OK_200).json(foundProducts);
});

app.get("/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === +req.params.id);
  if (!product) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json(product);
});

app.post("/products", (req: Request, res: Response) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const newProduct = {
    id: +new Date(),
    title: req.body.title,
  };
  products.push(newProduct);

  res
    .status(HTTP_STATUSES.CREATED_201)
    .json({ message: "New product created", data: newProduct });
});

app.delete("/products/:id", (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1);
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      return;
    }
  }
  res.send(404);
});

app.put("/products/:id", (req: Request, res: Response) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  let product = products.find((c) => c.id === +req.params.id);
  if (!product) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  product.title = req.body.title;

  res.status(HTTP_STATUSES.OK_200).json(product);
});

app.delete("/__test__/data", (req: Request, res: Response) => {
  db.courses = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// fetch('http://localhost:3004/courses', {method: "GET"})
//     .then(res => res.json())
//     .then(json => console.log(json))

// fetch("http://localhost:3004/courses?title=front", {method: "GET"})
// .then(res => res.json()).then(json => console.log(json))

// fetch("http://localhost:3004/courses", {method: "POST", body: JSON.stringify({title: "dba"}),headers:{
//     "content-type": "application/json"
// }})
// .then(res => res.json()).then(json => console.log(json))
