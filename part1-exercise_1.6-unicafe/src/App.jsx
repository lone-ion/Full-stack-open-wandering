import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const computePositive = () => {
    if (good === 0 && bad === 0 && neutral === 0) return "--";
    return (good / (good + neutral + bad)) * 100;
  };

  const computeAverage = () => {
    if (good === 0 && bad === 0 && neutral === 0) return "--";
    return (good - bad) / (good + bad + neutral);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + bad + neutral}</p>
      <p>average {computeAverage()}</p>
      <p>positive {computePositive()} %</p>
    </div>
  );
};

export default App;
