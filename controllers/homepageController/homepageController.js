const asyncHandler = require("express-async-handler");
const db = require("../../db/indexQuery");

exports.getHomepage = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.render("homepageView/homepage", {
      errors: [],
      user: req.user,
      messages: [],
    });
  }

  const messages = await db.readMessages();
  res.render("homepageView/homepage", {
    errors: [],
    user: req.user,
    messages: messages,
  });
});
