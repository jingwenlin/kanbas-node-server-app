import db from "../Database/index.js";

function AssignmentRoutes(app) {

  //Retrieving Assignments for Course
    app.get("/api/courses/:cid/assignments", (req, res) => {
      const { cid } = req.params;
      const assignments = db.assignments
        .filter((m) => m.course === cid);
      res.send(assignments);
    });


  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
  });


  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter((m) => m._id !== aid);
    res.sendStatus(200);
  });


  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const aIndex = db.assignments.findIndex(
      (m) => m._id === aid);
    db.assignments[aIndex] = {
      ...db.assignments[aIndex],
      ...req.body
    };
    res.sendStatus(204);
  });
}



export default AssignmentRoutes;