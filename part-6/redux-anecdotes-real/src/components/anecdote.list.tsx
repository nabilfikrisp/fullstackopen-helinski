import { useDispatch, useSelector } from "react-redux";
import type { Anecdote } from "../types/anecdote.type";
import { voteAction } from "../reducers/anecdoteReducer";
import type { RootState } from "../store";

export default function AnecdoteList() {
  const anecdotes = useSelector((state: RootState) => state.anecdotes);
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  function vote(id: Anecdote["id"]) {
    dispatch(voteAction(id));
  }

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedAnecdotes = [...filteredAnecdotes].sort(
    (a, b) => b.votes - a.votes
  );

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
