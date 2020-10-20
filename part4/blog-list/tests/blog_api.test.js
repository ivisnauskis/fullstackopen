const { application } = require("express");
const { TestScheduler } = require("jest");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const blogsRouter = require("../controllers/blogs");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blog = new Blog(helper.initialBlogs[0]);
  await blog.save();
  blog = new Blog(helper.initialBlogs[1]);
  await blog.save();
});

test("blogs returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("first blogs title is 'React patterns'", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body.map((b) => b.title)).toContain("React patterns");
});

test("id to be defined", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "test blog",
    author: "john doe",
    url: "http://test.blog",
    likes: 123,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const titles = blogsAtEnd.map((b) => b.title);
  expect(titles).toContain("test blog");
});

test("blog without likes will default to 0", async () => {
  const newBlog = {
    title: "test blog",
    author: "john doe",
    url: "http://test.blog",
  };

  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.body).toHaveProperty("likes", 0);
});

test("blog without title and url gets 400 status code", async () => {
  const newBlog = {
    author: "john doe",
    likes: 123,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

// test("invalid blog cannot be added", async () => {
//   const newBlog = {};

//   await api.post("/api/blogs").send(newBlog).expect(400);

//   const blogsAtEnd = await helper.blogsInDb();
//   expect(blogsRouter.length).toHaveLength(helper.initialBlogs.length);
// });

afterAll(() => {
  mongoose.connection.close();
});
