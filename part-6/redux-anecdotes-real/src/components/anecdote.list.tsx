import { useDispatch, useSelector } from "react-redux";
import {
  initializeAnecdotes,
  voteAnecdoteAction,
} from "../reducers/anecdoteReducer";
import { setTimedNotification } from "../reducers/notificationReducer";
import type { RootState, AppDispatch } from "../store";
import { useEffect } from "react";
import type { Anecdote } from "../types/anecdote.type";

export default function AnecdoteList() {
  const dispatch = useDispatch<AppDispatch>();
  const anecdotes = useSelector((state: RootState) => state.anecdotes);
  const filter = useSelector((state: RootState) => state.filter);

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  const vote = (anecdote: Anecdote) => {
    dispatch(voteAnecdoteAction(anecdote));
    dispatch(setTimedNotification(`You voted '${anecdote.content}'`, 5));
  };

  const sortedAnecdotes = [...filteredAnecdotes].sort(
    (a, b) => b.votes - a.votes
  );

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}
