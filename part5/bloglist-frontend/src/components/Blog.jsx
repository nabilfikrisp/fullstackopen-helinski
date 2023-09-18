import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleDelete }) => {
  const [seeDetail, setSeeDetail] = useState(false);
  const [showBlog, setShowBlog] = useState(blog);
  const handleLike = async (ev) => {
    ev.preventDefault();
    const updateLike = await blogService.update({
      ...showBlog,
      likes: showBlog.likes + 1,
    });
    setShowBlog(updateLike);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        border: "1px solid slateblue",
        padding: "10px",
        flexDirection: "column",
        height: "fit-content",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          height: "fit-content",
        }}
      >
        <p style={{ height: "fit-content" }}>
          {showBlog.title} {showBlog.author}{" "}
        </p>
        <button
          onClick={() => setSeeDetail(!seeDetail)}
          style={{ height: "fit-content" }}
        >
          {seeDetail ? "hide" : "view"}
        </button>
      </div>
      {seeDetail && (
        <div style={{ padding: "5px" }}>
          <a>{showBlog.url}</a>
          <p>
            likes {showBlog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{showBlog.user.username}</p>
          <button onClick={(ev) => handleDelete(ev, showBlog.id)}>
            remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
