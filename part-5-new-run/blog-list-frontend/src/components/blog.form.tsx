import { useState, type Dispatch, type SetStateAction } from "react";
import { createBlog } from "../services/blog";
import type { IBlog } from "../types/blog.type";
import { useToast } from "../toast/use-toast";

type BlogFormProps = {
  setBlogs: Dispatch<SetStateAction<IBlog[]>>;
};

export default function BlogForm({ setBlogs }: BlogFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await createBlog(formData);
      setBlogs((prevBlogs) => prevBlogs.concat(response));
      toast("Blog created successfully!");
      setFormData({ title: "", author: "", url: "" });
    } catch (error) {
      console.error("Error creating blog:", error);
      toast("Failed to create blog. Please try again.");
    }

    setLoading(false);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
}
