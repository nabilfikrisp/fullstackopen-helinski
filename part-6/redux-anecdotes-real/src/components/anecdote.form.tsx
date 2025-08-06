import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setTimedNotification } from "../reducers/notificationReducer";
import type { AppDispatch } from "../store";
import { postAnecdotes } from "../services/anecdotes";

export default function AnecdoteForm() {
  const dispatch = useDispatch<AppDispatch>();

  async function addAnecdote(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const form = event.currentTarget;
      const anecdoteContent = form.elements.namedItem(
        "anecdote"
      ) as HTMLInputElement;

      const content = anecdoteContent.value;

      await postAnecdotes(content);
      dispatch(createAnecdote(content));
      dispatch(setTimedNotification(`You created '${content}'`, 5));

      anecdoteContent.value = "";
    } catch (error: unknown) {
      console.error("Failed to create anecdote:", error);
      alert("Failed to create anecdote:");
    }
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
