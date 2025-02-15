const asyncHandler = require("express-async-handler");
const db = require("../../db/indexQuery");
const { body, validationResult } = require("express-validator");
/**
 * display all user message to logged in user
 */
exports.getHomepage = asyncHandler(async (req, res) => {
  const messages = await db.readMessages();
  res.render("homepageView/homepage", {
    errors: [],
    messages: messages,
  });
});

/**
 * handle admin client deletion of message
 */

exports.postDeleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  await db.deleteMessage({ messageId: messageId });
  res.redirect("/");
});

/**
 * handle client creation of message
 */

const titleExist = "should have a title";
const messageExist = "should contain text";

const messageValidationChain = [
  body("message_title").trim().notEmpty().withMessage(`title ${titleExist}`),
  body("message").trim().notEmpty().withMessage(`message ${messageExist}`),
];

exports.postCreateMessage = [
  messageValidationChain,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const messages = await db.readMessages();
      return res.status(400).render("homepageView/homepage", {
        errors: errors.array(),
        messages: messages,
      });
    }

    const { id } = req.user;
    const { message_title, message } = req.body;
    await db.createMessage({
      title: message_title,
      message: message,
      createdTime: new Date(),
      userId: id,
    });
    res.redirect("/");
  }),
];
