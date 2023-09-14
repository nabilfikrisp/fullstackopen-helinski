import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

import Login from "./components/forms/Login";
import CreateBlog from "./components/forms/CreateBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem("loggedUser")) {
      const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };

  const reFetchBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  return (
    <div>
      {user ? (
        <>
          <h2>blogs</h2>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout} style={{ height: "fit-content" }}>
              logout
            </button>
          </div>
          <CreateBlog reFetchBlogs={reFetchBlogs} />
          <div style={{ marginTop: "16px" }}>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

export default App;
