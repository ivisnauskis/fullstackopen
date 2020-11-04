import React from "react";
import Blog from "./Blog";

const BlogList = ({ user, blogs }) => {
  return (
    <div>
      {blogs
        .filter((b) => b.user.username === user.username)
        .map((b) => (
          <Blog key={b.id} blog={b} />
        ))}
    </div>
  );
};

export default BlogList;
