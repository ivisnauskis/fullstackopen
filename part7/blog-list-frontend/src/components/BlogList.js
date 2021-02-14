import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, handleLike, handleDelete }) => {
  return (
    <div>
      {blogs.map((b) => (
        <Blog
          handleLike={handleLike}
          handleDelete={handleDelete}
          key={b.id}
          blog={b}
        />
      ))}
    </div>
  );
};

export default BlogList;
