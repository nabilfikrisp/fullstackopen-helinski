import AnecdoteForm from "./components/anecdote.form";
import AnecdoteList from "./components/anecdote.list";

const App = () => {
  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
