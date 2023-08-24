import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const getAll = () => {
    return good + neutral + bad;
  };

  const getAvg = () => {
    return (good + -1 * bad) / getAll();
  };

  const getPositive = () => {
    return (good / getAll() || 0) * 100 + " %";
  };

  return (
    <>
      <h2>stats</h2>
      {getAll() === 0 ? (
        <h3>No Feedback given</h3>
      ) : (
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"All"} value={getAll()} />
            <StatisticLine text={"Average"} value={getAvg()} />
            <StatisticLine text={"Positive"} value={getPositive()} />
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => setGood((prev) => prev + 1)}>good</button>
      <button onClick={() => setNeutral((prev) => prev + 1)}>neutral</button>
      <button onClick={() => setBad((prev) => prev + 1)}>bad</button>

      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

export default App;
