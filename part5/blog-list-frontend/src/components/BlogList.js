import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map((b) => (
        <Blog key={b.id} blog={b} />
      ))}
    </div>
  );
};

export default BlogList;
