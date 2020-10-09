import React from "react";

const Total = ({ parts }) => {
  const total = parts.map((a) => a.exercises).reduce((a, b) => a + b);
  return <p>total of {total} exercises</p>;
};

export default Total;
