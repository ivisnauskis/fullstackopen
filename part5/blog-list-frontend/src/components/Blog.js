import React, { useState } from "react";

const Blog = ({ blog, handleLike }) => {
  const [isExpandedView, setIsExpandedView] = useState(false);

  return (
    <div className="blogComponent">
      <div>
        Title: {blog.title}
        <button onClick={() => setIsExpandedView(!isExpandedView)}>
          {isExpandedView ? "hide" : "view"}
        </button>
        {isExpandedView && (
          <div>
            <div>Author: {blog.author}</div>
            <div>Url: {blog.url}</div>
            <div>
              Likes: {blog.likes}
              <button onClick={() => handleLike(blog.id)}>like</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
