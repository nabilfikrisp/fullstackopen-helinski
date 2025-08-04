import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setTimedNotification } from "../reducers/notificationReducer";
import type { RootState, AppDispatch } from "../store";

export default function AnecdoteList() {
  const dispatch = useDispatch<AppDispatch>();
  const anecdotes = useSelector((state: RootState) => state.anecdotes);
  const filter = useSelector((state: RootState) => state.filter);

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  const vote = (id: string, content: string) => {
    dispatch(voteAnecdote(id));
    dispatch(setTimedNotification(`You voted '${content}'`, 5));
  };

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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
