//This is set of midddlewares handling operations for blog

const { isValidObjectId } = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const { sendError, getAverageRatings } = require("../utils/helper");

//Helper function handling the add blog by corresponding user
exports.addBlog = async (req, res) => {
  const { content, title } = req.body; //Extracting blog data from body
  const userId = req.user._id; //Extracting user id from headers which wass added in req from useAuth middleware

  if (!isValidObjectId(userId)) return sendError(res, "Invalid User!"); //Validating objectId of movie
  const user = await User.findOne({ _id: userId });
  //Creating new blog with data
  const newBlog = new Blog({
    title,
    owner: userId,
    content,
  });
  //Pushing the new data to the movie blog section
  user.blogs.push(newBlog._id);
  await user.save(); //commiting the update

  // saving new blog
  await newBlog.save();

  res.json({ message: "Your blog has been added." });
};

//Helper function to handle update Blog
exports.updateBlog = async (req, res) => {
  const { blogId } = req.params; //Getting blog id as param
  const { content, title } = req.body; //Extrxting data from req.body
  const userId = req.user._id; //Extracting user details from header

  if (!isValidObjectId(blogId)) return sendError(res, "Invalid Blog ID!"); //Validaating id

  //Searching blogss for document with owner as userid and id with blogid
  const blog = await Blog.findOne({ owner: userId, _id: blogId });
  if (!blog) return sendError(res, "Blog not found!", 404); //If not found error

  //Data update
  if (content) blog.content = content;
  if (title) blog.title = title;

  await blog.save(); //commiting update

  res.json({ message: "Your blog has been updated." });
};

//Helper function handles the delete request of an blog
exports.removeBlog = async (req, res) => {
  const { blogId } = req.params; //Extracting blog id as params
  const userId = req.user._id;

  if (!isValidObjectId(blogId)) return sendError(res, "Invalid blog ID!");

  // Acquiring the blog from database with same userid and blogid
  const blog = await Blog.findOne({ owner: userId, _id: blogId });
  if (!blog) return sendError(res, "Invalid request, blog not found!"); //Not found case

  //Searching the user with the user id in that blog
  const user = await User.findById(userId).select("blogs");
  //Filtering out the blog id from the user blogs
  user.blogs = user.blogs.filter((bId) => bId.toString() !== blogId);

  //Deleting the Blog
  await Blog.findByIdAndDelete(blogId);

  // commiting movie update
  await user.save();

  res.json({ message: "Blog removed successfully." });
};

//Helper function which returns the content of blog by blogID

exports.getBlogById = async (req, res) => {
  const { blogId } = req.params;
  if (!isValidObjectId(blogId)) return sendError(res, "Invalid blog ID!");
  const blog = await Blog.findById(blogId)
    .populate({
      path: "owner",
    })
    .select("title name content _id");
  if (!blog) return sendError(res, "Invalid id", 404);
  const blogdata = {
    title: blog.title,
    content: blog.content,
    owner: blog.owner.name,
    ownerID: blog.owner._id,
  };
  res.json({ blog: blogdata });
};

//Helper function which returns details of blogs for a user as an array
exports.getBlogsByUser = async (req, res) => {
  const userId = req.user._id; //Getting userId as param

  if (!isValidObjectId(userId)) return sendError(res, "Invalid user ID!"); //validatoing

  //Finding the user into user cluster and then populating the object relations as each user blogs section will contain
  //object id of blogs
  const user = await User.findById(userId) //populate expression which popultaes the blogs of user and selects the blogs
    .populate({
      path: "blogs",
    });

  //Formatting the data
  const blogs = user.blogs.map((r) => {
    const { title, content, _id: blogID } = r;
    return {
      id: blogID,
      title,
      content,
    };
  });
  res.json({ blogs: { blogs, user: { userID: user._id, name: user.name } } });
};

//Helper function which returns array of blogs

exports.getPaginatedBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameters or default to 1
  const limit = parseInt(req.query.limit) || 10; // Get the requested limit from the query parameters or default to 10
  const totalCount = await Blog.countDocuments(); // Get the total number of documents in the collection
  const totalPages = Math.ceil(totalCount / limit); // Calculate the total number of pages

  // Validating requested page number
  if (page < 1 || page > totalPages)
    return sendError(res, "Invalid user ID!", 404);

  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  // Retrieving paginated blogs from the database
  const blogs = await Blog.find().skip(skip).limit(limit);

  // Sending the paginated data as a response
  res.json({
    blogs: {
      page,
      limit,
      totalPages,
      totalCount,
      data: blogs,
    },
  });
};
