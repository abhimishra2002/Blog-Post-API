//This routes file handles all the routes and middleware related to the users

const express = require("express");

const { create, signIn, getAuthDetails } = require("../controller/user");
const {
  userValidtor,
  validate,
  signInValidator,
} = require("../middlewares/validator");
const { isAuth } = require("../middlewares/isAuth");

const router = express.Router();

//Route for the signing up of the user
router.post("/create", userValidtor, validate, create);

//Route for the signing in of the user
router.post("/sign-in", signInValidator, validate, signIn);

//Routes for authentication
// router.get("/is-auth", isAuth, getAuthDetails);
module.exports = router;
