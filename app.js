//define the app
const express = require("express");
const app = express();
//define the app's global middlewares + routes
const bodyParser = require("body-parser")
const UserRoute = require("./routes/user.routes");
const ToDoRoute = require('./routes/todo.router');
// use the middlewares
app.use(bodyParser.json())
app.use("/",UserRoute);
app.use("/",ToDoRoute);

module.exports = app;



/*app.js
1- defien the app
2- define global middlewares and routes
3- app.use("them")
*/ 


