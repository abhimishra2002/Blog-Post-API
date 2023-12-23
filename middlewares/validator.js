const { check, validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");

//This is validation middleware used to validate the req.body from user signup process

exports.userValidtor = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

//This is validation middleware used to validate the req.body from sign-in data

exports.signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];

// /This is validation middleware used to validate the req.body from add blog data

exports.blogValidtor = [
  check("title").trim().not().isEmpty().withMessage("title is missing!"),
  check("content").trim().not().isEmpty().withMessage("content is missing!"),
];

//This is validate middleware which will catch the errors thrown by the userValidator middleware

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.json({ error: error[0].msg });
  }
  next();
};
