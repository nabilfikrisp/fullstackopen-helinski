import { Link, useParams } from "react-router";
import { useAnecdotes } from "../contexts/anecdote.context";

export default function AnecdoteDetailPage() {
  const { anecdoteId } = useParams();
  const { anecdoteById } = useAnecdotes();

  if (!anecdoteId) {
    return <div>No anecdote selected</div>;
  }

  const anecdote = anecdoteById(Number(anecdoteId));

  if (!anecdote) {
    return <div>Anecdote not found</div>;
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>by {anecdote.author}</p>
      <p>
        for more info visit{" "}
        <Link target="_blank" to={anecdote.info}>
          this link
        </Link>
      </p>
    </div>
  );
}
