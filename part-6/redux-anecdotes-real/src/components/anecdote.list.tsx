import { useDispatch, useSelector } from "react-redux";
import type { Anecdote } from "../types/anecdote.type";
import { voteAction } from "../reducers/anecdoteReducer";

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => state as Anecdote[]);
  const dispatch = useDispatch();

  function vote(id: Anecdote["id"]) {
    dispatch(voteAction(id));
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}
