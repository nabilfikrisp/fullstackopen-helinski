import { useEffect, useState } from "react";
import Blog from "./blog";
import type { IBlog } from "../types/blog.type";
import { getBlogList } from "../services/blog";
import BlogForm from "./blog.form";

function sortByLikes(blogs: IBlog[]): IBlog[] {
  return [...blogs].sort((a, b) => (b.likes || 0) - (a.likes || 0));
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      setIsLoading(true);
      try {
        const data = await getBlogList();
        setBlogs(data);
      } finally {
        setIsLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const handleToggleCreate = () => setIsCreating((prev) => !prev);

  const sortedBlogs = sortByLikes(blogs);

  function deleteBlogCallback(deletedBlog: IBlog) {
    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog) => blog.id !== deletedBlog.id)
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2>Blogs</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {isCreating ? (
        <>
          <h2>Create a new blog</h2>
          <BlogForm setBlogs={setBlogs} />
        </>
      ) : (
        <>
          <h2>Blogs</h2>
          {blogs.length === 0 ? (
            <p>No blogs found.</p>
          ) : (
            sortedBlogs.map((blog) => (
              <Blog key={blog.id} blog={blog} onDelete={deleteBlogCallback} />
            ))
          )}
        </>
      )}
      <button onClick={handleToggleCreate} style={{ marginTop: 16 }}>
        {isCreating ? "Cancel" : "Create Blog"}
      </button>
    </div>
  );
}
