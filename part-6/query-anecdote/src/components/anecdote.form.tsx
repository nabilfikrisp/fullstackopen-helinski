import type { FormEvent } from "react";
import { usePostAnecdote } from "../services/anecdotes";
import { useNotification } from "../contexts/notification.context";
import { handleError } from "../utils/handle-error";

export default function AnecdoteForm() {
  const { mutateAsync, isPending } = usePostAnecdote();
  const { setNotification } = useNotification();
  async function onCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const form = event.currentTarget;
      const anecdoteContent = form.elements.namedItem(
        "anecdote"
      ) as HTMLInputElement;

      const content = anecdoteContent.value;

      await mutateAsync(content);
      setNotification(`You created a new anecdote: "${content}"`, 5000);
      anecdoteContent.value = "";
      console.log(`new anecdote ${content}`);
    } catch (error: unknown) {
      const errorMessage = handleError(error);
      setNotification(`Error creating anecdote: ${errorMessage}`, 5000);
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" placeholder="test" />
        <button type="submit" disabled={isPending}>
          create
        </button>
      </form>
    </div>
  );
}
