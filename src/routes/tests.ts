import { Request, Response, Express } from "express";
import { app } from "../app";
import { HTTP_STATUSES } from "./courses";
import { DBType, db } from "../db/db";

export const addTestsRoutes = (app: Express, db: DBType) => {
  app.delete("/__test__/data", (req: Request, res: Response) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });
};
