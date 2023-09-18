import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

import Login from "./components/forms/Login";
import CreateBlog from "./components/forms/CreateBlog";
import Alert from "./components/Alert";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [myAlert, setMyAlert] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {
    if (window.localStorage.getItem("loggedUser")) {
      const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
    blogService.getAll().then((blogs) => setBlogs(sort(blogs)));
  }, []);

  const sort = (object) => {
    return object.sort((a, b) => {
      return b.likes - a.likes;
    });
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
  };

  const reFetchBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(sort(blogs)));
  };

  const handleDelete = async (ev, id) => {
    ev.preventDefault();
    if (window.confirm("Are you sure to delete?")) {
      try {
        const deleteResponse = await blogService.remove(id);
        console.log(deleteResponse, "RESPONSE");
        reFetchBlogs();
        setMyAlert({
          message: `successfully deleted`,
          type: "success",
        });
      } catch (error) {
        setMyAlert({
          message: `error: ${error}`,
          type: "error",
        });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMyAlert({ message: "", type: "" });
    }, 5000);
  }, [myAlert]);

  return (
    <>
      {myAlert.message !== "" && (
        <Alert type={myAlert.type}>{myAlert.message}</Alert>
      )}
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
            {!showCreateBlog && (
              <button onClick={() => setShowCreateBlog(true)}>
                create blog
              </button>
            )}
            {showCreateBlog && (
              <CreateBlog
                reFetchBlogs={reFetchBlogs}
                setShowCreateBlog={setShowCreateBlog}
              />
            )}
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} handleDelete={handleDelete} />
              ))}
            </div>
          </>
        ) : (
          <Login setUser={setUser} />
        )}
      </div>
    </>
  );
};

export default App;
