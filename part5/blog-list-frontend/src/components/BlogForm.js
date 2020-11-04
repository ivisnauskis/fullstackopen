import React from "react";

const BlogForm = ({
  onSubmit,
  newAuthor,
  newTitle,
  newUrl,
  setNewAuthor,
  setNewTitle,
  setNewUrl,
}) => {
  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          Title:
          <input
            type="text"
            onChange={({ target }) => setNewTitle(target.value)}
            value={newTitle}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            onChange={({ target }) => setNewAuthor(target.value)}
            value={newAuthor}
          />
        </div>
        <div>
          Url:
          <input
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
