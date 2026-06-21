const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/blogdb");

const Post = mongoose.model("Post", {
  title: String,
  content: String
});

const Comment = mongoose.model("Comment", {
  postId: String,
  comment: String
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

app.get("/comments", async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

app.post("/comments", async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.json(comment);
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
