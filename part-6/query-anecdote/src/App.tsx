import AnecdoteForm from "./components/anecdote.form";
import AnecdoteList from "./components/anecdote.list";
import Notification from "./components/notifications";

export default function App() {
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      <AnecdoteList />
    </div>
  );
}
