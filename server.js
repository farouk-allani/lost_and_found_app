//require express
const express = require("express");
const connectDB = require("./config/connectDB");
//instance of all express methods
const app = express();
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
//port
PORT = process.env.PORT;
//start the server
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
