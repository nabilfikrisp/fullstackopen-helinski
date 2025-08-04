import AnecdoteForm from "./components/anecdote.form";
import AnecdoteList from "./components/anecdote.list";
import Filter from "./components/filter";

const App = () => {
  return (
    <div>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
