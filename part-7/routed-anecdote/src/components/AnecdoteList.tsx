import { Link } from "react-router";
import type { Anecdote } from "../data";

type AnecdoteListProps = {
  anecdotes: Anecdote[];
};

const AnecdoteList = ({ anecdotes }: AnecdoteListProps) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content} by {anecdote.author}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default AnecdoteList;
