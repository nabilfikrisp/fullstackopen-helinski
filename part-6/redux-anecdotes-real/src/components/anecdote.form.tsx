import { useDispatch } from "react-redux";
import { newAnecdoteAction } from "../reducers/anecdoteReducer";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  function addAnecdote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const anecdoteContent = form.elements.namedItem(
      "anecdote"
    ) as HTMLInputElement;

    const content = anecdoteContent.value;

    dispatch(newAnecdoteAction(content));

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
