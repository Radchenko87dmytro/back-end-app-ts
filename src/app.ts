import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { CourseViewModel } from "./models/CourseViewModel";
import { getCoursesRouter } from "./routes/courses";
import { CourseType, db } from "./db/db";
import { getTestsRouter } from "./routes/tests";
import { getInterestingRouter } from "./routes/getInterestingRouter";
import { productsRouter } from "./routes/products-router";
import { addressesRouter } from "./routes/addresses-router";

export const app = express();
app.use(bodyParser());

// const authGuardMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.query.token === "123") {
//     next();
//   } else {
//     res.send(401);
//   }
// };

// let requestCounter = 0;

// const requestCounterMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   requestCounter++;
//   next();
// };

// //app.use(requestCounterMiddleware);
// app.use(authGuardMiddleware);

const corsMiddleware = cors();
app.use(corsMiddleware);

export const jsonBodyMiddleware = bodyParser.json();

app.use(jsonBodyMiddleware);

app.use("/courses", getCoursesRouter(db));
app.use("/__test__", getTestsRouter(db));
app.use("/interesting", getInterestingRouter(db));

app.use("/products", productsRouter);
app.use("/addresses", addressesRouter);

// app.get("/products", (req: Request, res: Response) => {
//   //const blabla = req.blabla
//   res.send({ value: "blabla " });
// });
