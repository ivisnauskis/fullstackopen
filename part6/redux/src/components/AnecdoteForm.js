import React from "react";
import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onCreateAnecdote = async (event) => {
    const content = event.target.anecdote.value;
    event.preventDefault();
    const anecdote = await anecdoteService.create(content);
    dispatch(create(anecdote));
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
