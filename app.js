const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config();

// const homePageRouter = require("./routes/homepageRouter/homepageRouter");
const createUserRouter = require("./routes/createUserRouter/createUserRouter");
const errorRouter = require("./routes/errorRouter/errorRouter");
const joinTheClubRouter = require("./routes/joinClubRouter/joinClubRouter");
const logInRouter = require("./routes/logInRouter/logInRouter");

// set views
const viewPath = path.join(__dirname, "views");
app.set("view engine", "ejs");
app.set("views", viewPath);

// serve static file
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));

// app.use("/", homePageRouter);

// sign up form
app.use("/createUser", createUserRouter);

// log in form
app.use("/logIn", logInRouter);

// clubhouse leadership
app.use("/joinTheClub", joinTheClubRouter);

// catch all unknown get router
app.use("*", errorRouter);

// you want to handle error in the end
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is running at port ${PORT}`);
});
