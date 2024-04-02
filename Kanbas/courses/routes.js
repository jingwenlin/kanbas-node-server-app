import Database from "../Database/index.js";
export default function CourseRoutes(app) {
  //4.2.1 Retrieving Courses
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses)
  });

   //lecture demonstration: able to retrieve a specific course,courseId as primary key
  //http://localhost:4000/api/courses/RS101
  app.get("/api/courses/:courseId", (req, res) => {
    const courses = Database.courses;
    const courseId = req.params.courseId;
    const course = courses.find((course) => course._id === courseId);
    res.send(course);
  });

  //4.2.2 Creating New Courses
  app.post("/api/courses", (req, res) => {
    const course = {...req.body,_id:Date.now().toString()};
    Database.courses.push(course);
    res.send(Database.courses)
  });
  //4.2.3 Deleting a Course
  app.delete("/api/courses/:courseId", (req, res) => {
  const courseId = req.params.courseId;
  Database.courses = Database.courses.filter((course) => course._id !== courseId);
  res.send(Database.courses);
  });

  //4.2.4 Updating a Course 
  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses.map((c) =>
      c._id === id ? { ...c, ...course } : c
    );
    res.sendStatus(204);
  });


  //4.2.5 Retrieve a Course by their ID
  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = Database.courses
      .find((c) => c._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });

  

}
