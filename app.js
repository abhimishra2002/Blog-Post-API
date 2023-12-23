require("express-async-errors"); //Automatically handles the error forward it to the error handling middleware
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const express = require("express");

// require("dotenv").config();
const cors = require("cors"); //Handle the cross origin header problem

require("./db");
const userRouter = require("./routes/user.js");
const blogRouter = require("./routes/blog.js");

const { errorHandler } = require("./middlewares/error");
const { notFoundHandler } = require("./utils/helper");

const app = express();
//For parsing the data
app.use(express.json());

//For handling CORS problem
app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Too many requests from this IP, please try again after a few minutes",
});

app.use(limiter);
//Definig the routes to be used for given user path
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

//For all undefined paths to handle 404 error
app.use("/*", notFoundHandler);

//Handling the errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("the port is listening on port" + PORT);
});
