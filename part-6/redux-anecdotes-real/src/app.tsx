import AnecdoteForm from "./components/anecdote.form";
import AnecdoteList from "./components/anecdote.list";
import Filter from "./components/filter";
import Notification from "./components/notifications";

const App = () => {
  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
