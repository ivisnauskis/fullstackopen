const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.map((blog) => blog.likes).reduce((a, b) => a + b);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const fav = blogs.sort((a, b) => b.likes - a.likes)[0];
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorsMap = new Map();

  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author;
    if (authorsMap.has(author)) {
      authorsMap.set(author, authorsMap.get(author) + 1);
    } else {
      authorsMap.set(author, 1);
    }
  }

  const topBlogger = [...authorsMap.entries()].sort((a, b) => b[1] - a[1])[0];

  return {
    author: topBlogger[0],
    blogs: topBlogger[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorsMap = new Map();

  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author;
    const likes = blogs[i].likes;

    if (authorsMap.has(author)) {
      authorsMap.set(author, authorsMap.get(author) + likes);
    } else {
      authorsMap.set(author, likes);
    }
  }

  const mostLiked = [...authorsMap.entries()].sort((a, b) => b[1] - a[1])[0];

  return {
    author: mostLiked[0],
    likes: mostLiked[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
