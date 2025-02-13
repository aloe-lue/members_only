const expressAsyncHandler = require("express-async-handler");
const db = require("../../db/indexQuery");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

exports.getSecretCodePage = (req, res) => {
  res.render("secretCodeView/secretCode", { errors: [] });
};

const secretPassword = "should not be empty";
const secretLeaderPassword = "Should match select role password";
const memberRole = "should choose between leader and admin";

const passwordValidation = [
  body("memberRole").trim().notEmpty().withMessage(`member role ${memberRole}`),
  body("secretPassword")
    .trim()
    .notEmpty()
    .withMessage(`Secret Password ${secretPassword}`)
    .custom(async (value, { req }) => {
      const secretCode = await db.getSecretCode({
        memberRole: req.body.memberRole,
      });
      const { secret_code } = secretCode.at(0);

      const match = await bcryptjs.compare(value, secret_code);
      if (!match) {
        throw new Error("it the password bruhh");
      }
    })
    .withMessage(`secret password ${secretLeaderPassword}`),
];

exports.postSecretCodePage = [
  passwordValidation,
  expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("secretCodeView/secretCode", {
        errors: errors.array(),
      });
    }

    const { id, first_name, last_name, username } = req.user;
    const { memberRole } = req.body;
    const role = memberRole == "admin_password" ? 1 : 2;

    await db.updateUserMembershipStatus({
      role: role,
      id: id,
      firstName: first_name,
      lastName: last_name,
      username: username,
    });
    res.redirect("/");
  }),
];
