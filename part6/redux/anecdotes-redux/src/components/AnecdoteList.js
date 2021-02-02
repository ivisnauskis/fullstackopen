import React from "react";
import { connect } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const filter = props.filter;
  const anecdotes = props.anecdotes.filter((a) =>
    a.content.toUpperCase().includes(filter.toUpperCase())
  );

  console.log("filtered", anecdotes);

  const vote = (anecdote) => {
    props.voteFor(anecdote.id);
    props.setNotification(`You voted '${anecdote.content}'`, 5);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  voteFor,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
