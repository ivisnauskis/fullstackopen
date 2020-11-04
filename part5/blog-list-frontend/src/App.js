import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/BlogService";
import loginService from "./services/LoginService";
import BlogList from "./components/BlogList";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
    } catch (exception) {}
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

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  };

  const blogList = () => {
    return (
      <div>
        <h1>Blogs</h1>
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
        <BlogList user={user} blogs={blogs} />
      </div>
    );
  };

  return <div>{user ? blogList() : loginForm()}</div>;
};

export default App;
