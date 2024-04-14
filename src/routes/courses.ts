import express, { Express, Response } from "express";
import { CourseCreateModel } from "../models/CourseCreateModel";
import { CourseUpdateModel } from "../models/CourseUpdateModel";
import { CourseViewModel } from "../models/CourseViewModel";
import { CoursesQueryModel } from "../models/GetCourseQueryModel";
import { URIParamsCourseIDModel } from "../models/URIParamsCourseIDModel";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "../types";
import { CourseType, DBType, db } from "../db/db";
import { HTTP_STATUSES } from "../utils";



export const getCourseVievModel = (dbCourse: CourseType): CourseViewModel => {
  return {
    id: dbCourse.id,
    title: dbCourse.title,
  };
};

 

 export const getCoursesRouter = ( db: DBType) => {
const router = express.Router()
router.get(
    "/",
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

  router.get(
    "/:id",
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

  router.post(
    "/",
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

  router.delete(
    "/:id",
    (req: RequestWithParams<URIParamsCourseIDModel>, res: Response) => {
      db.courses = db.courses.filter((c) => c.id !== +req.params.id);
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  );

  router.put(
    "/:id",
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

  return router
};
