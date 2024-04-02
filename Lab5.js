const todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
  ];
  
const assignment = {
    id: 1, 
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  };
  const module = {
    id: 123, name: "module",
    description: "This is module",
    course: "module course", 
  };
  
  
const Lab5 = (app) => {
    app.get("/a5/welcome", (req, res) => {
        res.send("Welcome to Assignment 5");
      });
    app.get("/a5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
      });
      app.get("/a5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
      });
    
    //   3.5.2
      app.delete("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        //3.5.4
        if (!todo) {
            res.status(404)
              .json({ message: `Unable to delete Todo with ID ${id}` });
            return;
          }
      
        todos.splice(todos.indexOf(todo), 1);
        res.sendStatus(200);
      });
    
    
    app.get("/a5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        const todoIndex = todos.indexOf(todo);
        if (todoIndex !== -1) {
          todos.splice(todoIndex, 1);
        }
        res.json(todos);
      });

      app.post("/a5/todos", (req, res) => {
        const newTodo = {
          ...req.body,
          id: new Date().getTime(),
        };
        todos.push(newTodo);
        res.json(newTodo);
      });
    
    
    app.get("/a5/todos/create", (req, res) => {
        const newTodo = {
          id: new Date().getTime(),
          title: "New Task",
          completed: false,
        };
        todos.push(newTodo);
        res.json(todos);
      });

    
    app.get("/a5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
          const completedBool = completed === "true";
          const completedTodos = todos.filter(
            (t) => t.completed === completedBool);
          res.json(completedTodos);
          return;
        }
    
        res.json(todos);
      });

     //   3.3.7 completed
      app.get("/a5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.completed = completed;
        res.json(todos);
      });


       //   3.3.7 
       app.get("/a5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.description = description;
        res.json(todos);
      });

    

          
    // app.get("/a5/todos/:id", (req, res) => {
    //     const { id } = req.params;
    //     const todo = todos.find((t) => t.id === parseInt(id));
    //     res.json(todo);
    //   });

    // 3.5.3
    app.put("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
            // 3.5.3
        if (!todo) {
            res.status(404)
              .json({ message: `Unable to update Todo with ID ${id}` });
            return;
          }
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.due = req.body.due;
        todo.completed = req.body.completed;
        res.sendStatus(200);
      });
    

      app.get("/a5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
      });
    
    app.get("/a5/module", (req, res) => {
        res.json(module);
      });
      app.get("/a5/module/name", (req, res) => {
        res.json(module.name);
      });
      app.get("/a5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
      });

      //module description
      app.get("/a5/module/description/:newDescription", (req, res) => {
        const { newDescription} = req.params;
        module.description = newDescription;
        res.json(module);
      });
    
    
    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);
      });
      app.get("/a5/assignment/title", (req, res) => {
        res.json(assignment.title);
      });
      app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
      });
    
      //route for score in assignment 
      app.get("/a5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = newScore;
        res.json(assignment);
      });
    

    app.get("/a5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
          case "add":
            result = parseInt(a) + parseInt(b);
            break;
          case "subtract":
            result = parseInt(a) - parseInt(b);
            break;
          case "multiply":
            result = parseInt(a) * parseInt(b);
            break;
          case "divide":
            result = b !== '0' ? parseInt(a) / parseInt(b) : "Cannot divide by zero";
            break;
          default:
            result = "Invalid operation";
        }
        res.send(result.toString());
      });
       
  };
  export default Lab5;












// const assignment = {
//     _id:123,
//     title:"Node HTTP Server with Express",
//     description: "Create a calculator using ExpressJS",
//     due:"2021-10-15",
//     completed:false,
//     score:0,
// };
// const todos=[
//     {_id:123,title:"Learn HTML", completed:true},
//     {_id:124,title:"Learn CSS", completed:true},
//     {_id:125,title:"Learn JavaScript", completed:true},
//     {_id:126,title:"Learn Node.js", completed:false},
//     {_id:127,title:"Learn Express.js", completed:false},
//     {_id:128,title:"Learn MongoDB", completed:false},
// ];

// export default function Lab5(app) {
//     app.get("/a5/todos/completed",(req,res)=>{
//         const Completedtodos = todos.filter((todo)=>todo.completed)
//         res.send(Completedtodos);
//     });
//     app.get("/a5/todos",(req,res)=>{
//         res.send(todos);
//     });
//         app.get("/a5/assignment",(req,res)=>{
//             res.send(assignment);
//         });
//         app.get("/a5/assignment/title",(req,res)=>{
//             res.send(assignment.title);
//         });
//         app.get("/a5/assignment/title/:newTitle",(req,res)=>{
//             const newTitle = req.params.newTitle;
//             assignment.title = newTitle;
//             res.send(assignment);
//         });
//         const lab5 = (req, res) => {
//         res.send("<h1>Lab5</h1>");
//     };
//     app.get("/a5/calculator", (req, res) => {
//         // res.send("<h1>Calculator</h1>");
//         const query = req.query;
//         const a = parseInt(query.a);
//         const b = parseInt(query.b);
//         const op = query.operation;
//         switch(op){
//             case "add":
//                 res.send(`Sum of ${a} and ${b} is ${a+b}`);
//                 break;
//             case "sub":
//                 res.send(`Difference of ${a} and ${b} is ${a-b}`);
//                 break;
//                 default:
//                     res.send("Invalid operation");
//         }
//     });
//     app.get("/a5/add/:num1/:num2", (req, res) => {
//         // const params = req.params;
//         // res.send(params);
//         const num1 = parseInt(req.params.num1);
//         const num2 = parseInt(req.params.num2);
//         const sum = num1 + num2;
//         res.send(`Sum of ${num1} and ${num2} is ${sum}`);
//     });

//     app.get("/a5/welcome", lab5);
// }



