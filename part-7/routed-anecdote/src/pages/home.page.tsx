import AnecdoteList from "../components/AnecdoteList";
import { useAnecdotes } from "../contexts/anecdote.context";
import { useNotification } from "../contexts/notification.context";

export default function HomePage() {
  const { anecdotes } = useAnecdotes();
  const { notification } = useNotification();

  return (
    <div>
      {notification && (
        <div
          style={{
            border: "1px solid green",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#d4edda",
            color: "#155724",
          }}
        >
          {notification}
        </div>
      )}
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  );
}
