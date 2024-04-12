// import db from "../Database/index.js";
// function ModuleRoutes(app) {

//   //4.3.1 Retrieving Modules for Course
//   app.get("/api/courses/:cid/modules", (req, res) => {
//     const { cid } = req.params;
//     const modules = db.modules
//       .filter((m) => m.course === cid);
//     res.send(modules);
//   });


// //4.3.2 Creating Modules for a Course
//   app.post("/api/courses/:cid/modules", (req, res) => {
//     const { cid } = req.params;
//     const newModule = {
//       ...req.body,
//       course: cid,
//       _id: new Date().getTime().toString(),
//     };
//     db.modules.push(newModule);
//     res.send(newModule);
//   });

// //4.3.3 Deleting a Module
//   app.delete("/api/modules/:mid", (req, res) => {
//     const { mid } = req.params;
//     db.modules = db.modules.filter((m) => m._id !== mid);
//     res.sendStatus(200);
//   });


//   app.put("/api/modules/:mid", (req, res) => {
//     const { mid } = req.params;
//     const moduleIndex = db.modules.findIndex(
//       (m) => m._id === mid);
//     db.modules[moduleIndex] = {
//       ...db.modules[moduleIndex],
//       ...req.body
//     };
//     res.sendStatus(204);
//   });


// }
// export default ModuleRoutes;

import * as dao from "./dao.js";

function ModuleRoutes(app) {
  // 4.3.1 Retrieving Modules for Course
  app.get("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    try {
      const modules = await dao.findModulesByCid(cid);
      res.send(modules);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // 4.3.2 Creating Modules for a Course
  app.post("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const newModuleData = {
      ...req.body,
      course: cid,
    };
    try {
      const newModule = await dao.createModules(newModuleData);
      res.send(newModule);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // 4.3.3 Deleting a Module
  app.delete("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    try {
      await dao.deleteModules(mid);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // Update a Module
  app.put("/api/modules/:mid", async (req, res) => {
    const { mid } = req.params;
    const updatedModuleData = req.body;
    try {
      await dao.updateModules(mid, updatedModuleData);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}

export default ModuleRoutes;
