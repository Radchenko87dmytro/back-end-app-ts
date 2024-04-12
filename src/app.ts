import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { CourseViewModel } from "./models/CourseViewModel";
import { HTTP_STATUSES, addCoursesRoutes } from "./routes/courses";
import { CourseType, db } from "./db/db";
import { addTestsRoutes } from "./routes/tests";

export const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);
const jsonBodyMiddleware = bodyParser.json();
app.use(jsonBodyMiddleware);

export const getCourseVievModel = (dbCourse: CourseType): CourseViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
  };
};

addCoursesRoutes(app, db);
addTestsRoutes(app, db);

// const products = [
//   { id: 1, title: "tomato" },
//   { id: 2, title: "orange" },
// ];

// const addresses = [
//   { id: 1, value: "Independence 21" },
//   { id: 2, value: "Salers 11" },
// ];

////////////////////////////////////////////////////////////
// app.get("/products", (req: Request, res: Response) => {
//   let foundProducts = products;
//   if (req.query.title) {
//     res.send(
//       products.filter((p) => p.title.indexOf(req.query.title as string) > -1)
//     );
//   } else {
//     res.send(foundProducts);
//   }
//   res.status(HTTP_STATUSES.OK_200).json(foundProducts);
// });

// app.get("/products/:id", (req: Request, res: Response) => {
//   const product = products.find((p) => p.id === +req.params.id);
//   if (!product) {
//     res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
//     return;
//   }
//   res.json(product);
// });

// app.post("/products", (req: Request, res: Response) => {
//   if (!req.body.title) {
//     res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
//     return;
//   }

//   const newProduct = {
//     id: +new Date(),
//     title: req.body.title,
//   };
//   products.push(newProduct);

//   res
//     .status(HTTP_STATUSES.CREATED_201)
//     .json({ message: "New product created", data: newProduct });
// });

// app.delete("/products/:id", (req: Request, res: Response) => {
//   for (let i = 0; i < products.length; i++) {
//     if (products[i].id === +req.params.id) {
//       products.splice(i, 1);
//       res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
//       return;
//     }
//   }
//   res.send(404);
// });

// app.put("/products/:id", (req: Request, res: Response) => {
//   if (!req.body.title) {
//     res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
//     return;
//   }

//   let product = products.find((c) => c.id === +req.params.id);
//   if (!product) {
//     res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
//     return;
//   }

//   product.title = req.body.title;

//   res.status(HTTP_STATUSES.OK_200).json(product);
// });
