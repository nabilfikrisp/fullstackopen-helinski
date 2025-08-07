import { useState } from "react";
import type { Anecdote } from "../data";
import { useAnecdotes } from "../contexts/anecdote.context";
import { useNotification } from "../contexts/notification.context";
import { useNavigate } from "react-router";

const CreateNewPage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");

  const { addNew } = useAnecdotes();
  const { showNotification } = useNotification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnecdote = {
      content,
      author,
      info,
      votes: 0,
    } as Anecdote;

    addNew(newAnecdote);
    showNotification(`A new anecdote '${content}' created!`);
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNewPage;
