import React from "react";
import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onCreateAnecdote = (event) => {
    event.preventDefault();
    dispatch(create(event.target.anecdote.value));
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

export default AnecdoteForm;
