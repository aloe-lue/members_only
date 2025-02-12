const expressAsyncHandler = require("express-async-handler");
const { validationResult, body } = require("express-validator");
const db = require("../../db/indexQuery");
const bcryptjs = require("bcryptjs");

const firstName = "should not be left empty";
const username = "should be an email or custom name like misu34";
const passwordLeft = "uh oh this is required";
const password =
  "should contain down and up case letter as well as numbers and symbols";
const passwordMatch = "should match";

const createUserValidation = [
  body("firstName").trim().notEmpty().withMessage(`first name  ${firstName}`),
  body("lastName").trim().notEmpty().withMessage(`last name ${firstName}`),
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`username ${username}`)
    .custom(async (value) => {
      const user = await db.findUserByUsername({ username: value });
      if (user[0]) {
        throw new Error("E-mail is in use");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`password ${passwordLeft}`)
    .isStrongPassword()
    .withMessage(`password ${password}`),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`confirm password ${passwordMatch}`),
];

exports.postCreateUser = [
  createUserValidation,
  expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("homepageView/homepage", {
        errors: errors.array(),
      });
    }

    const { firstName, lastName, username, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    await db.createUser({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });
    res.redirect("/log-in");
  }),
];
