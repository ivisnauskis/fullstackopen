import React, { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/BlogService";
import loginService from "./services/LoginService";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import BlogService from "./services/BlogService";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true);
  const blogFormRef = useRef();

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInBlogAppUser", JSON.stringify(user));
    } catch (exception) {
      createNotification(false, "Wrong credentials");
    }
  };

  const handleLike = async (id) => {
    var blog = blogs.find((b) => b.id === id);
    var blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
    };

    var updatedBlog = await blogService.update(blogToUpdate, blogToUpdate.id);
    setBlogs(
      blogs
        .map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
        .sort((a, b) => b.likes - a.likes)
    );
  };

  const handleDelete = async (id) => {
    var blog = blogs.find((b) => b.id === id);
    const toDelete = window.confirm(
      `Are you sure you want to delete blog "${blog.title}" by ${blog.author}`
    );
    if (toDelete) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((b) => b.id !== id));
        createNotification(true, `"${blog.title}" has been deleted`);
      } catch (error) {
        createNotification(false, error.response.data.error);
      }
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInBlogAppUser");
    blogService.setToken("");
    setUser(null);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedInBlogAppUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loadBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs.sort((a, b) => b.likes - a.likes));
  };

  const createBlog = async (blogToAdd) => {
    try {
      const response = await BlogService.create(blogToAdd);
      setBlogs(blogs.concat(response));
      blogFormRef.current.toggleVisibility();
      createNotification(
        true,
        `${response.title} by ${response.author} has been added`
      );
    } catch (error) {
      createNotification(false, error.response.data.error);
    }
  };

  const createNotification = (isSuccess, message) => {
    setNotification(message);
    setIsSuccess(isSuccess);

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <Notification message={notification} isSuccess={isSuccess} />
      {user ? (
        <div>
          <h1>Blogs</h1>
          <div>
            {user.name} logged in
            <button id="logoutButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <Togglable buttonLabel="add blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <BlogList
            handleLike={handleLike}
            handleDelete={handleDelete}
            blogs={blogs}
          />
        </div>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
