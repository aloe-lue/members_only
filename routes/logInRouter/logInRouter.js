const { Router } = require("express");
const logInRouter = Router();
const logInController = require("../../controllers/logInController/logInController");
const passport = require("passport");

logInRouter.get("/", logInController.getLogInPage);
logInRouter.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/log-in",
    failureMessage: true,
    successRedirect: "/",
  })
);

module.exports = logInRouter;
