const { Router } = require("express");
const secretCodeRouter = Router();
const secretCodeController = require("../../controllers/secretCodeController/secretCodeController");

secretCodeRouter.get("/", secretCodeController.getSecretCodePage);
secretCodeRouter.post("/", secretCodeController.postSecretCodePage);

module.exports = secretCodeRouter;
