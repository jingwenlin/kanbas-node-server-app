import * as dao from "./dao.js";

export default function UserRoutes(app) {
  //3.5.4
  // app.get("/api/users", async (req, res) => {
  //   const wer = await dao.findAllUsers();
  //   res.json(wer);
  // });

  //3.5.4  and 3.5.8
  app.get("/api/users", async (req, res) => {
    const { role } = req.query;
  
    try {
      let users;
      if (role) {
        // If a role query parameter is provided, find users by that role
        users = await dao.findUsersByRole(role);
      } else {
        // If no role query parameter is provided, find all users
        users = await dao.findAllUsers();
      }
      res.json(users);
    } catch (error) {
      // If there's an error, send a 500 server error response
      res.status(500).json({ error: error.message });
    }
  });
  
  //3.5.7
  app.get("/api/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await dao.findUserById(userId);
    res.send(user);
  });
//3.5.3
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const status = await dao.updateUser(userId, req.body);
  await dao.findUserById(userId); 
  res.json(status);
};
app.put("/api/users/:userId", updateUser);

//3.5.5
const deleteUser = async (req, res) => {
  const status = await dao.deleteUser(req.params.userId);
  res.json(status);
};
app.delete("/api/users/:userId", deleteUser);


  app.post("/api/users/register", async (req, res) => {
    console.log("[1] register");
    const { username, password } = req.body;
    console.log("[2] username, password", username, password);

    const existingUser = await dao.findUserByCredentials(username, password);
    console.log("[3] existingUser", existingUser);
    if (existingUser) {
      res.status(400).send("Username already exists");
      return;
    }
    try {
      const newUser = await dao.createUser({ username, password });
      console.log("[4] newUser", newUser);
      req.session["currentUser"] = newUser;
      console.log("[5] req.session", req.session);
      res.send(newUser);
    } catch (e) {
      console.log("Error Creating User");
    }
  });
//3.5.2
  app.post("/api/users/profile", async (req, res) => {
    console.log("[6] profile");
    console.log("[7] req.session", req.session);
    if (!req.session.currentUser) {
      console.log("[8] Not logged in");
      res.status(401).send("Not logged in");
      return;
    }
    console.log("[9] req.session.currentUser", req.session.currentUser);
    res.send(req.session.currentUser);
  });

  app.post("/api/users/logout", async (req, res) => {
    req.session.destroy();
    res.send("Logged out");
  });

  app.post("/api/users/login", async (req, res) => {
    const { username, password } = req.body;
    const ewq = await dao.findUserByCredentials(username, password);
    if (ewq) {
      req.session.currentUser = ewq;
      res.send(ewq);
    } else {
      res.status(401).send("Invalid credentials");
    }
  });

//3.5.5
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);

}


