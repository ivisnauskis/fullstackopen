import React, { useState } from "react";
import ReactDOM from "react-dom";
import Heading from "./Components/Heading";
import Button from "./Components/Button";
import Statistics from "./Components/Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const clickHandler = (value, setValue) => {
    setValue(value + 1);
  };

  return (
    <div>
      <Heading text="give feedback" />
      <Button text="good" onClick={() => clickHandler(good, setGood)} />
      <Button
        text="neutral"
        onClick={() => clickHandler(neutral, setNeutral)}
      />
      <Button text="bad" onClick={() => clickHandler(bad, setBad)} />
      <Heading text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
