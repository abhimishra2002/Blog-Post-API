const router = require("express").Router();
const {
  addBlog,
  updateBlog,
  removeBlog,
  getBlogById,
  getBlogsByUser,
  getPaginatedBlogs,
} = require("../controller/blog");
const { isAuth } = require("../middlewares/isAuth");
const { blogValidtor, validate } = require("../middlewares/validator");

router.post("/add", isAuth, blogValidtor, validate, addBlog);
router.patch("/:blogId", isAuth, updateBlog);
router.delete("/:blogId", isAuth, removeBlog);
router.get("/getBlog/:blogId", getBlogById);
router.get("/getBlogsByUser", isAuth, getBlogsByUser);
router.get("/getBlogs", getPaginatedBlogs);

module.exports = router;
