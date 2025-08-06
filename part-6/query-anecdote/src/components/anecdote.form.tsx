import type { FormEvent } from "react";
import { usePostAnecdote } from "../services/anecdotes";

export default function AnecdoteForm() {
  const { mutateAsync, isPending } = usePostAnecdote();
  async function onCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const form = event.currentTarget;
      const anecdoteContent = form.elements.namedItem(
        "anecdote"
      ) as HTMLInputElement;

      const content = anecdoteContent.value;

      await mutateAsync(content);

      anecdoteContent.value = "";
      console.log(`new anecdote ${content}`);
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "An error occurred");
      console.error("Error creating anecdote:", error);
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
