const express = require('express');
const Blog = require("../models/Blog");

const router= express.Router();

router.get("/blogs", (req, res) => {
    Blog.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render("index", { title: "all blogs", blogs: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.post("/blogs", (req, res) => {
    const blog = new Blog(req.body);
  
    blog
      .save()
      .then((result) => {
        res.redirect("/blogs");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create a new blog" });
  });
  
  router.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then((result) => {
        res.render("details", { blog: result, title: "Blog details" });
      })
      .catch((err) => {
        res.render("404", {title: "Blog not found"});
      });
  });
  
  router.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;
  
    Blog.findByIdAndDelete(id)
      .then((result) => {
        res.json({ redirect: "/blogs" });
      })
      .catch((err) => console.log(err));
  });

  module.exports= router;