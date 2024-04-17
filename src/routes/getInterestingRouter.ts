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

export const getInterestingRouter = ( db: DBType) => {
    const router = express.Router()
    
    
    //   router.get(
    //     "/:id",
    //     (
    //       req: RequestWithParams<URIParamsCourseIDModel>,
    //       res: Response<CourseViewModel>
    //     ) => {
          
    //       res.json({title: "data by id: " + req.params.id});
    //     }
    //   );
    
    //   router.get(
    //     "/books",
    //     (
    //       req: RequestWithQuery<CoursesQueryModel>,
    //       res: Response<CourseViewModel[]>
    //     ) => {
           
    //         res.json({title: "books"});
    //     }
    //   );
    
      return router
    };