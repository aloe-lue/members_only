const { Router } = require("express");
const homepageRouter = Router();
const homepageController = require("../../controllers/homepageController/homepageController");

homepageRouter.get("/", homepageController.getHomepage);

module.exports = homepageRouter;
