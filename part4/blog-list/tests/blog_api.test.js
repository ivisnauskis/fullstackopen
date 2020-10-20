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

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promises = blogObjects.map((blog) => blog.save());
  await Promise.all(promises);
});

describe("With inital blogs", () => {
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
});

describe("Adding a blog", () => {
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

  test("invalid blog cannot be added", async () => {
    const newBlog = {};

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("Deleting a blog", () => {
  test("blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("Updating a blog", () => {
  test("blog can be updated", async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];

    const newBlog = {
      title: "Updated title",
      author: "Updated author",
      url: "Updated url",
      likes: 333,
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);
    const updatedBlogs = await helper.blogsInDb();

    console.log(updatedBlogs[0]);
    expect(updatedBlogs[0].id).toBe(blogToUpdate.id);
    expect(updatedBlogs[0].title).toBe("Updated title");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
