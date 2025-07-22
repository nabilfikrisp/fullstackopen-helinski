import { useState, useEffect } from "react";
import { getBlogList } from "./services/blog";
import Blog from "./components/blog";
import type { IBlog } from "./types/blog.type";
import type { ILoginResponse } from "./types/user.type";
import LoginForm from "./components/login.form";
import { IntializeUser } from "./services/login";
import BlogForm from "./components/blog.form";
import Notification from "./components/notification";

export default function App() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [user, setUser] = useState<ILoginResponse | null>(IntializeUser());

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getBlogList();
      setBlogs(data);
    }
    fetchBlogs();
  }, []);

  function handleLogout() {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  }

  return (
    <div>
      <Notification />

      {user ? (
        <div>
          <h1>Hello, {user.name}</h1>

          <h2>Create a new blog</h2>
          <BlogForm setBlogs={setBlogs} />

          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </div>
  );
}
