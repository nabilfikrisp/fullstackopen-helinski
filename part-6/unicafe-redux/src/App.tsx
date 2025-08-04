import { store } from "./main";

export default function App() {
  function good() {
    store.dispatch({
      type: "GOOD",
    });
  }

  function ok() {
    store.dispatch({
      type: "OK",
    });
  }

  function bad() {
    store.dispatch({
      type: "BAD",
    });
  }

  function zero() {
    store.dispatch({
      type: "ZERO",
    });
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
}
