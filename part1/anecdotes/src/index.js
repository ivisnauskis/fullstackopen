import React, { useState } from "react";
import ReactDOM from "react-dom";

const Heading = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Anecdote = ({ anecdote }) => {
  return <div>{anecdote}</div>;
};

const Votes = ({ count }) => {
  return <div>has {count} votes</div>;
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0));

  const mostVotesCount = Math.max(...votes);
  const mostVotesIndex = votes.indexOf(mostVotesCount);
  const mostVotes = props.anecdotes[mostVotesIndex];

  const voteClick = () => {
    var newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
    console.log(votes);
  };

  const nextClick = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Anecdote anecdote={props.anecdotes[selected]} />
      <Votes count={votes[selected]} />
      <Button text="vote" onClick={voteClick} />
      <Button text="next anecdote" onClick={nextClick} />
      <Heading text="Anecdote with most votes" />
      <Anecdote anecdote={mostVotes} />
      <Votes count={mostVotesCount} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
