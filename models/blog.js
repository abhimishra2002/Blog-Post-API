const mongoose = require("mongoose");

//This is the schema for blog creation

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    required: true,
    type: String,
    trim: true,
  },
});

//Model Creation
module.exports = mongoose.model("Blog", blogSchema);
