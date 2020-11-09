import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, handleLike }) => {
  return (
    <div>
      {blogs.map((b) => (
        <Blog handleLike={handleLike} key={b.id} blog={b} />
      ))}
    </div>
  );
};

export default BlogList;
