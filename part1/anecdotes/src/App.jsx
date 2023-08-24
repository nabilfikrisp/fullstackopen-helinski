import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [point, setPoint] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const [selected, setSelected] = useState(0);

  const getRandomAnecdotesIdx = () => {
    return Math.floor(Math.random() * (anecdotes.length - 0) + 0);
  };

  const onNextClick = () => {
    setSelected(getRandomAnecdotesIdx());
  };

  const updatePoint = () => {
    const updatedPoint = [...point];
    updatedPoint[selected] += 1;
    setPoint(updatedPoint);
  };

  const getMostVotedAnecdotes = () => {
    return anecdotes[indexOfMax(point)];
  };

  console.log(getMostVotedAnecdotes(), point, anecdotes[selected], selected);

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={() => updatePoint()}>vote</button>
      <button onClick={() => onNextClick()}>next anecdotes</button>

      <h2>Anecdotes with most votes</h2>
      <p>{getMostVotedAnecdotes()}</p>
    </div>
  );
};

const indexOfMax = (arr) => {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
};

export default App;
