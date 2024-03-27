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
//import  {  } from "express";
//const express = require("express");

const port = process.env.Port || 5000;
const app: Express = express();

const corsMiddleware = cors();
app.use(corsMiddleware);
const jsonBodyMiddleware = bodyParser.json();
app.use(jsonBodyMiddleware);

const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

const db = {
  courses: [
    { id: 1, title: "front-end" },
    { id: 2, title: "back-end" },
    { id: 3, title: "authomation" },
    { id: 4, title: "devops" },
  ],
};

app.get("/", (req: Request, res: Response) => {
  res.send("Hello IT !!!");
  // res.status(200).json({message: "Got post", data: })
});

app.get("/courses", (req: Request, res: Response) => {
  let foundCourses = db.courses;
  if (req.query.title) {
    foundCourses = foundCourses = db.courses.filter(
      (c) => c.title.indexOf(req.query.title as string) > -1
    );
  }
  res.status(HTTP_STATUSES.OK_200).json(foundCourses);
});

app.get("/courses/:id", (req: Request, res: Response) => {
  const foundCourse = db.courses.find((c) => c.id === +req.params.id);
  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json(foundCourse);
});

app.post("/courses", (req: Request, res: Response) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const createdCourse = {
    id: +new Date(),
    title: req.body.title,
  };
  db.courses.push(createdCourse);
  console.log(createdCourse);
  res
    .status(HTTP_STATUSES.CREATED_201)
    .json({ message: "New cours created", data: createdCourse });
});

app.delete("/courses/:id", (req: Request, res: Response) => {
  db.courses = db.courses.filter((c) => c.id !== +req.params.id);

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.put("/courses/:id", (req: Request, res: Response) => {
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
