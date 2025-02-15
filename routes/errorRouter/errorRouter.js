const { Router } = require("express");
const errorRouter = Router();
const errorController = require("../../controllers/errorController/errorController");

errorRouter.get("/", errorController.getERRpage);

module.exports = errorRouter;
