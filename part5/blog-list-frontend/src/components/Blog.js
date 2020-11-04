import React from "react";

const Blog = ({ blog }) => {
  return (
    <div>
      <div>Title: {blog.title}</div>
      <div>Author: {blog.author}</div>
      <div>Url: {blog.url}</div>
    </div>
  );
};

export default Blog;
