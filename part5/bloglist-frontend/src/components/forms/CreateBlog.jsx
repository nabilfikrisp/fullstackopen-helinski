import React, { useEffect, useState } from "react";
import Alert from "../Alert";
import blogService from "../../services/blogs";

const CreateBlog = ({ reFetchBlogs, setShowCreateBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [myAlert, setMyAlert] = useState({
    message: "",
    type: "",
  });

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setNewBlog((prev) => ({ ...prev, [inputName]: inputValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newBlog.title) {
      setMyAlert({ message: "Title is required", type: "error" });
      console.log(myAlert, "my alert");
      return;
    }
    if (!newBlog.author) {
      setMyAlert({ message: "Author is required", type: "error" });
      return;
    }
    if (!newBlog.url) {
      setMyAlert({ message: "URL is required", type: "error" });
      return;
    }
    try {
      await blogService.create(newBlog);
      setMyAlert({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        type: "success",
      });
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
      reFetchBlogs();
    } catch (error) {
      setMyAlert({
        message: `error: ${error}`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMyAlert({ message: "", type: "" });
    }, 7000);
  }, [myAlert]);

  return (
    <div style={{ width: "25vw" }}>
      {myAlert?.message !== "" ? (
        <Alert type={myAlert?.type}>{myAlert?.message}</Alert>
      ) : (
        <></>
      )}

      <h2>Create new</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newBlog.title}
          onChange={handleChange}
        />
        <label htmlFor="author">author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={newBlog.author}
          onChange={handleChange}
        />
        <label htmlFor="url">url</label>
        <input
          type="text"
          id="url"
          name="url"
          value={newBlog.url}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
      <button onClick={() => setShowCreateBlog(false)}>cancel</button>
    </div>
  );
};

export default CreateBlog;
