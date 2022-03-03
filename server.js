//require express
const express = require("express");
var cors = require('cors')
const connectDB = require("./config/connectDB");
const path=require('path');
//instance of all express methods
const app = express();
app.use(cors())
//-------------------------------------
require("dotenv").config();
//connect with database
connectDB();
//Global middlware to read json type
app.use(express.json());
//acces to user routers
app.use("/api/user", require("./router/user"));
// //acces to admin routers
app.use("/api/admin", require("./router/admin"));
//access to profile routes
app.use("/api/profile", require("./router/profile"));
//access to post routes
app.use("/api/post", require("./router/post"));
//access to comment routes
app.use("/api/post/comment", require("./router/comment"));

//access to demand routes
app.use("/api/demand", require("./router/demand"));

// For the deploy
app.use(express.static(path.join(__dirname, "client", "build")));
// Rendering the front end 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


//port
port = process.env.PORT || 8000;
//start the server
app.listen(port, () => {
  console.log("server is running on port", port);
});
