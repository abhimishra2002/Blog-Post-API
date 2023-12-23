//This model handles the user related callback functions

const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { sendError } = require("../utils/helper");

// This is the create function which handles the user creation for signup process

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  //Checking the email existence in the database

  const oldUser = await User.findOne({ email });

  if (oldUser) return sendError(res, "This email is already in use!");

  //Creation of the new user

  const newUser = new User({ name, email, password });
  await newUser.save();

  res.status(201).json({
    user: {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    },
  });
};

//Fuction which handle the sign-in process

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  //Finds the user with provided mail
  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email/Password mismatch!");

  //Compares the password
  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Email/Password mismatch!");

  const { _id, name, role } = user;
  //Creating a web-token having userid
  const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);

  res.json({
    user: { id: _id, name, email, token: jwtToken },
  });
};
