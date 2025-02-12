const { Router } = require("express");
const signUpRouter = Router();
const signUpController = require("../../controllers/signUpController/signUpController");

signUpRouter.post("/", signUpController.postCreateUser);

module.exports = signUpRouter;
