const { Router } = require("express");
const homepageRouter = Router();
const homepageController = require("../../controllers/homepageController/homepageController");

homepageRouter.get("/", homepageController.getHomepage);
homepageRouter.post(
  "/delete-message/:messageId",
  homepageController.postDeleteMessage
);
homepageRouter.post("/create-message", homepageController.postCreateMessage);

module.exports = homepageRouter;
