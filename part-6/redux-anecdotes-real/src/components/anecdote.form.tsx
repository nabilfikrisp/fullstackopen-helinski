import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setTimedNotification } from "../reducers/notificationReducer";
import type { AppDispatch } from "../store";

export default function AnecdoteForm() {
  const dispatch = useDispatch<AppDispatch>();

  function addAnecdote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const anecdoteContent = form.elements.namedItem(
      "anecdote"
    ) as HTMLInputElement;

    const content = anecdoteContent.value;

    dispatch(createAnecdote(content));
    dispatch(setTimedNotification(`You created '${content}'`, 5));

    anecdoteContent.value = "";
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}
