import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [isExpandedView, setIsExpandedView] = useState(false);

  return (
    <div className="blogComponent">
      <div>
        {blog.title} by {blog.author}
        <button onClick={() => setIsExpandedView(!isExpandedView)}>
          {isExpandedView ? "hide" : "view"}
        </button>
        {isExpandedView && (
          <div className="expandedView">
            <div>Url: {blog.url}</div>
            <div>
              Likes: {blog.likes}
              <button onClick={() => handleLike(blog.id)}>like</button>
            </div>
            <div>Added by: {blog.username}</div>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
