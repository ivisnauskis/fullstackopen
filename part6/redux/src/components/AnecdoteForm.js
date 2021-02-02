import React from "react";
import { connect } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const onCreateAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.create(content);
    props.setNotification(`new anecdote '${content}'`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onCreateAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default connect(null, { create, setNotification })(AnecdoteForm);
