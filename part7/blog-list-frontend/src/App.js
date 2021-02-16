import React, { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/BlogService";
import loginService from "./services/LoginService";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import "./index.css";
import { setNotification } from "./store/reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs, createBlog } from "./store/reducers/blogsReducer";

const App = () => {
  const blogsState = useSelector((state) => state.blogs);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInBlogAppUser", JSON.stringify(user));
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 500)
        createNotification(false, "Unexpected error, try again later.");
      else createNotification(false, err.response.data.error);
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
    dispatch(initBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedInBlogAppUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogToAdd) => {
    dispatch(createBlog(blogToAdd));
    blogFormRef.current.toggleVisibility();
  };

  const createNotification = (isSuccess, message) => {
    dispatch(setNotification({ message, success: isSuccess }));
  };

  return (
    <div>
      <Notification />
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
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <BlogList
            handleLike={handleLike}
            handleDelete={handleDelete}
            blogs={blogsState}
          />
        </div>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
