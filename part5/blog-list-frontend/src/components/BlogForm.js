import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newAuthor, setNewAuthor] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const blogToAdd = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    createBlog(blogToAdd);

    setNewAuthor("");
    setNewTitle("");
    setNewUrl("");
  };

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          Title:
          <input
            id="title"
            type="text"
            onChange={({ target }) => setNewTitle(target.value)}
            value={newTitle}
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            type="text"
            onChange={({ target }) => setNewAuthor(target.value)}
            value={newAuthor}
          />
        </div>
        <div>
          Url:
          <input
            id="url"
            type="text"
            onChange={({ target }) => setNewUrl(target.value)}
            value={newUrl}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
