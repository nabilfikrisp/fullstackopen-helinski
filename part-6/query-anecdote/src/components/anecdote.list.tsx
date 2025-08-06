import { useGetAnecdotes, usePutAnecdote } from "../services/anecdotes";
import type { Anecdote } from "../types/anecdote";

export default function AnecdoteList() {
  const { data, error } = useGetAnecdotes();
  const { mutateAsync, isPending } = usePutAnecdote();

  if (error) {
    return <div>Error loading anecdotes: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading anecdotes...</div>;
  }

  async function handleVote(anecdote: Anecdote) {
    try {
      await mutateAsync({ ...anecdote, votes: anecdote.votes + 1 });
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "An error occurred");
      console.error("Error voting for anecdote:", error);
    }
  }

  return (
    <ul>
      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)} disabled={isPending}>
              vote
            </button>
          </div>
        </div>
      ))}
    </ul>
  );
}
