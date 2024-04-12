import request from "supertest";
import { app } from "../../src/app";
import { CourseCreateModel } from "../../src/models/CourseCreateModel";
import { HTTP_STATUSES } from "../../src/routes/courses";

describe("/course", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  it("should return 200 and  array", async () => {
    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  it("should return 404 for not existing course", async () => {
    //expect(1).toBe(1);
    await request(app).get("/courses/1").expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it("shouldn't create course with incorrect input data", async () => {
    const data: CourseCreateModel = { title: "it-course" };
    await request(app)
      .post("/courses")
      .send(data)
      .expect(HTTP_STATUSES.BAD_REQUEST_400);

    await request(app).get("/courses").expect(HTTP_STATUSES.OK_200, []);
  });

  // it("should create course with correct input data", async () => {
  //   const createResponse = await request(app)
  //     .post("/courses")
  //     .send({ title: "new course" });
  //   // .expect(HTTP_STATUSES.CREATED_201);

  //   const createdCourse = createResponse.body;

  //   // expect(createdCourse).toEqual({
  //   //   // id: expect.any(Number),
  //   //   title: "new course",
  //   // });

  //   await request(app)
  //     .get("/courses")
  //     .expect(HTTP_STATUSES.OK_200, [createdCourse]);
  // });

  let createdCourse1: any = null;
  it("should create course with correct input data", async () => {
    const data: CourseCreateModel = { title: "it-course" };
    const createResponse = await request(app)
      .post("/courses")
      .send(data)
      .expect(HTTP_STATUSES.CREATED_201);

    const createdCourse1 = createResponse.body;

    expect(createdCourse1).toEqual({
      id: expect.any(Number),
      title: "it-course",
    });

    await request(app)
      .get("/courses")
      .expect(HTTP_STATUSES.OK_200, [createdCourse1]);
  });
});
