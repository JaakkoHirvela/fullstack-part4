const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((max, blog) => (max.likes >= blog.likes ? max : blog));
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  // Get blogs per author
  const authorBlogs = blogs.reduce((author, blog) => {
    author[blog.author] = (author[blog.author] || 0) + 1;
    return author;
  }, {});

  // Get author with most blogs.
  const [author, blogCount] = Object.entries(authorBlogs).reduce((max, entry) => {
    return max[1] >= entry[1] ? max : entry;
  }, ["", 0]);

  return { author, blogs: blogCount };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  // Get likes per author
  const authorLikes = blogs.reduce((author, blog) => {
    author[blog.author] = (author[blog.author] || 0) + blog.likes;
    return author;
  }, {});

  // Get author with most likes.
  const [author, likes] = Object.entries(authorLikes).reduce((max, entry) => {
    return max[1] >= entry[1] ? max : entry;
  }, ["", 0]);

  return { author, likes };
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
