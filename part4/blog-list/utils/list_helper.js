const _ = require("lodash");

const dummy = (blog) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs) {
    return 0;
  }

  if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    const likes = blogs.reduce(
      (prevBlog, currBlog) => Number(prevBlog.likes) + Number(currBlog.likes)
    );
    return likes;
  }
};

const favoriteBlog = (blogs) => {
  if (!blogs) {
    return 0;
  }
  if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    const favorite = blogs.reduce((prevBlog, currBlog) =>
      Number(prevBlog.likes) > Number(currBlog.likes) ? prevBlog : currBlog
    );
    return favorite;
  }
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null; // Handle the case where there are no blogs.
  }

  const authorCounts = _.countBy(blogs, "author");
  const maxAuthor = _.maxBy(
    _.keys(authorCounts),
    (author) => authorCounts[author]
  );

  return {
    author: maxAuthor,
    blogs: authorCounts[maxAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorLikes = _.chain(blogs)
    .groupBy("author")
    .mapValues((authorBlogs) => _.sumBy(authorBlogs, "likes"))
    .value();

  const maxAuthor = _.maxBy(
    _.keys(authorLikes),
    (author) => authorLikes[author]
  );

  return {
    author: maxAuthor,
    likes: authorLikes[maxAuthor],
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
