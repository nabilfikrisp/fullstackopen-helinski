import { useField } from "../hooks";
import type { Anecdote } from "../data";
import { useAnecdotes } from "../contexts/anecdote.context";
import { useNotification } from "../contexts/notification.context";
import { useNavigate } from "react-router";

const CreateNewPage = () => {
  const navigate = useNavigate();
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("url");

  const { addNew } = useAnecdotes();
  const { showNotification } = useNotification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    } as Anecdote;

    addNew(newAnecdote);
    showNotification(`A new anecdote '${content.value}' created!`);
    navigate("/");
  };

  function handleReset() {
    resetAuthor();
    resetContent();
    resetInfo();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNewPage;
