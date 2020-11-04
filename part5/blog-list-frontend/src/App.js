import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/BlogService";
import loginService from "./services/LoginService";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import BlogService from "./services/BlogService";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newAuthor, setNewAuthor] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [notification, setNotification] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInBlogAppUser", JSON.stringify(user));
    } catch (exception) {
      createNotification(false, "Wrong credentials");
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
    setBlogs(blogs);
    blogs.forEach((b) => console.log(b.user.id));
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    const blogToAdd = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    try {
      const response = await BlogService.create(blogToAdd);
      setBlogs(blogs.concat(response));
      setNewAuthor("");
      setNewTitle("");
      setNewUrl("");

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
            <button onClick={handleLogout}>Logout</button>
          </div>
          <BlogForm
            newAuthor={newAuthor}
            newTitle={newTitle}
            newUrl={newUrl}
            setNewAuthor={setNewAuthor}
            setNewTitle={setNewTitle}
            setNewUrl={setNewUrl}
            onSubmit={handleCreateBlog}
          />
          <BlogList blogs={blogs} />
        </div>
      ) : (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
