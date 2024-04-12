// const express = require('express');
import "dotenv/config";
import express from "express";
import session from "express-session"
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import SecurityController from"./SecurityController.js";
import UserRoutes from "./Users/routes.js";
import mongoose from "mongoose";

// mongoose.connect("mongodb://127.0.0.1:27017/kanbas-sp24-mon");
mongoose.connect("mongodb://localhost:27017/kanbas-sp24-mon");

const app = express();
app.use(cors({
    // origin: "https://a5--cerulean-kringle-eccd3f.netlify.app",
    // origin: "http://localhost:3000",
    credentials: true,
    origin: process.env.FRONTEND_URL

}));
app.use(express.json());
// app.use(session({
//     secret: "keyboard cat",
//     resave: true,
//     saveUninitialized: true
// }));
//4.4
// const sessionOptions = {
//     secret: "any string",
//     resave: false,
//     saveUninitialized: false,
//   };
//   app.use(
//     session(sessionOptions)
//   );
//4.4
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));
  
  

Hello(app);
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
SecurityController(app);
UserRoutes(app);

// app.listen(4000);
app.listen(process.env.PORT || 4000);


