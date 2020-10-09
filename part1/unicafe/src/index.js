import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Stats = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const clickHandler = (value, setValue) => {
    setValue(value + 1);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" onClick={() => clickHandler(good, setGood)} />
      <Button
        text="neutral"
        onClick={() => clickHandler(neutral, setNeutral)}
      />
      <Button text="bad" onClick={() => clickHandler(bad, setBad)} />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
