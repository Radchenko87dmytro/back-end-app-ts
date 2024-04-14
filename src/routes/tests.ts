import express, { Request, Response, Express } from "express";
import { app } from "../app";

import { DBType, db } from "../db/db";
import { HTTP_STATUSES } from "../utils";

export const getTestsRouter = (db: DBType) => {
  const router = express.Router();
  app.delete("/data", (req: Request, res: Response) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });
  return router;
};
