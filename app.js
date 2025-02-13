const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config();

const homepageRouter = require("./routes/homepageRouter/homepageRouter");
const signUpRouter = require("./routes/signUpRouter/signUpRouter");
const logInRouter = require("./routes/logInRouter/logInRouter");
const createMessageRouter = require("./routes/createMessageRouter/createMessageRouter");
const logOutRouter = require("./routes/logOutRouter/logOutRouter");
const secretCodeRouter = require("./routes/secretCodeRouter/secretCodeRouter");

const session = require("express-session");
const passport = require("passport");
const localStrategy = require("./config/localStrategy/localStrategy");

// set views
const viewPath = path.join(__dirname, "views");
app.set("view engine", "ejs");
app.set("views", viewPath);

// serve static files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// get json obj from html inputs
app.use(express.urlencoded({ extended: false }));

// express session
const expressSession = session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.SECRET_HEHE,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
});

app.use(expressSession);
app.use(passport.session());
passport.use(localStrategy.strategy);

app.use((req, res, next) => {
  // display user error when logging in
  res.locals.msg = req.session.messages;
  res.locals.currentUser = req.user;
  next();
});

passport.serializeUser(localStrategy.serializeUserFunc);
passport.deserializeUser(localStrategy.deserializeUserFunc);

app.use("/", homepageRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-in", logInRouter);
app.use("/secret-code", secretCodeRouter);
app.use("/create-message", createMessageRouter);
app.use("/log-out", logOutRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is running at port ${PORT}`);
});
