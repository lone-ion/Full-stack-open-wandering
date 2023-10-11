import { useState } from "react";

const Statistics = ({ good, bad, neutral }) => {
  const computePositive = () => {
    if (good === 0 && bad === 0 && neutral === 0) return "--";
    return (good / (good + neutral + bad)) * 100 + " %";
  };

  const computeAverage = () => {
    if (good === 0 && bad === 0 && neutral === 0) return "--";
    return (good - bad) / (good + bad + neutral);
  };

  if (computeAverage() === "--") {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="all" value={good + bad + neutral} />
        <StatisticsLine text="average" value={computeAverage()} />
        <StatisticsLine text="positive" value={computePositive()} />
      </table>
    </div>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
