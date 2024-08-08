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

  // Get blogs per author object as entries of and reduce to get author with most blogs.
  const [author, blogCount] = Object.entries(authorBlogs).reduce((max, entry) => {
    return max[1] >= entry[1] ? max : entry;
  }, ["", 0]);

  return { author, blogs: blogCount };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
