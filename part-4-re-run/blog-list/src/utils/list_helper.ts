import { IBlog } from "#models/blog.js";

interface IAuthorWithMostBlogs {
  author: string;
  blogs: number;
}

interface IAuthorWithMostLikes {
  author: string;
  likes: number;
}

type IBlogResponse = IBlog & {
  __v: number;
  _id: string;
};

export function authorWithMostBlogs(blogs: IBlogResponse[]): IAuthorWithMostBlogs | null {
  if (blogs.length === 0) return null;

  // Count blogs per author
  const blogCountsByAuthor: Record<string, number> = {};

  for (const blog of blogs) {
    const author = blog.author;
    blogCountsByAuthor[author] = (blogCountsByAuthor[author] ?? 0) + 1;
  }

  // Find the author with the most blogs
  let mostBlogsAuthor: null | string = null;
  let mostBlogsCount = 0;

  for (const author in blogCountsByAuthor) {
    const count = blogCountsByAuthor[author];
    if (count > mostBlogsCount) {
      mostBlogsAuthor = author;
      mostBlogsCount = count;
    }
  }

  if (mostBlogsAuthor === null) return null;

  return {
    author: mostBlogsAuthor,
    blogs: mostBlogsCount,
  };
}

export function authorWithMostLikes(blogs: IBlogResponse[]): IAuthorWithMostLikes | null {
  if (blogs.length === 0) return null;

  const likeCountsByAuthor: Record<string, number> = {};

  // for object of array of objects
  for (const blog of blogs) {
    const author = blog.author;
    likeCountsByAuthor[author] = (likeCountsByAuthor[author] ?? 0) + blog.likes;
  }

  let mostLikesAuthor: null | string = null;
  let mostLikesCount = 0;

  // for key of keys of object
  for (const author in likeCountsByAuthor) {
    const count = likeCountsByAuthor[author];
    if (count > mostLikesCount) {
      mostLikesAuthor = author;
      mostLikesCount = count;
    }
  }

  if (mostLikesAuthor === null) return null;

  return {
    author: mostLikesAuthor,
    likes: mostLikesCount,
  };
}

export function dummy(blog: unknown[]) {
  console.log(blog, "dummy function called");
  return 1;
}

export function favoriteBlog(blogs: IBlogResponse[]) {
  if (blogs.length === 0) return null;

  const mostLikedBlog = blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });

  return mostLikedBlog;
}

export function totalLikes(blog: IBlog[]) {
  if (blog.length === 1) {
    return Number(blog[0].likes);
  }

  return 1;
}
