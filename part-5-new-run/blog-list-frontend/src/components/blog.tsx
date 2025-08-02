import { useState } from "react";
import { deleteBlog, likeBlog } from "../services/blog";
import type { IBlog } from "../types/blog.type";
import { IntializeUser } from "../services/login";

export default function Blog({
  blog,
  onDelete,
}: {
  blog: IBlog;
  onDelete: (blog: IBlog) => void;
}) {
  const [localBlog, setLocalBlog] = useState(blog);
  const [isDetail, setIsDetail] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLike() {
    setLoading(true);
    try {
      const updatedBlog = await likeBlog(localBlog);
      setLocalBlog(updatedBlog);
      console.log(`Liked blog: ${localBlog.title}`);
    } catch (error) {
      console.error("Error liking blog:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    // Only proceed if user confirms
    const confirmed = window.confirm(
      `Are you sure you want to delete the blog: ${localBlog.title}?`
    );
    if (!confirmed) return;
    setLoading(true);
    try {
      await deleteBlog(localBlog);
      onDelete(localBlog);
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <article
      aria-label={`Blog post: ${localBlog.title}`}
      style={articleStyle}
      className="blog"
    >
      <strong>
        {localBlog.title} - {blog.author}
      </strong>
      <button onClick={() => setIsDetail((v) => !v)}>
        {isDetail ? "Hide" : "Show"} Details
      </button>
      {isDetail && (
        <BlogDetails
          blog={localBlog}
          onLike={handleLike}
          loading={loading}
          handleDelete={handleDelete}
        />
      )}
    </article>
  );
}

// Inline style moved to a constant
const articleStyle = {
  border: "1px solid #ddd",
  borderRadius: 6,
  padding: "12px 16px",
  marginBottom: 12,
  boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
};

function BlogDetails({
  blog,
  onLike,
  loading,
  handleDelete,
}: {
  blog: IBlog;
  onLike: () => void;
  loading: boolean;
  handleDelete: () => void;
}) {
  const user = IntializeUser();

  return (
    <div>
      <p>
        URL: <a href={blog.url}>{blog.url || "-"}</a>
      </p>
      <div>
        Like: {blog.likes || 0} <LikeButton onLike={onLike} loading={loading} />
      </div>
      {user!.id === blog.createdBy && (
        <button onClick={handleDelete} disabled={loading}>
          delete
        </button>
      )}
    </div>
  );
}

export function LikeButton({
  onLike,
  loading,
}: {
  onLike: () => void;
  loading: boolean;
}) {
  return (
    <button onClick={onLike} disabled={loading}>
      Like
    </button>
  );
}
