import { useNotification } from "../contexts/notification.context";
import { useGetAnecdotes, usePutAnecdote } from "../services/anecdotes";
import type { Anecdote } from "../types/anecdote";

export default function AnecdoteList() {
  const { data, error } = useGetAnecdotes();
  const { mutateAsync, isPending } = usePutAnecdote();
  const { setNotification } = useNotification();

  if (error) {
    return <div>Error loading anecdotes: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading anecdotes...</div>;
  }

  async function handleVote(anecdote: Anecdote) {
    try {
      await mutateAsync({ ...anecdote, votes: anecdote.votes + 1 });
      setNotification(`You voted for "${anecdote.content}"`, 5000);
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
