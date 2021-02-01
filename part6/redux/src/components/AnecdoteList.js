import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const filter = state.filter;
  const anecdotes = state.anecdotes.filter((a) =>
    a.content.toUpperCase().includes(filter.toUpperCase())
  );

  console.log("filtered", anecdotes);

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote.id));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {state.anecdotes.map((anecdote) => (
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

export default AnecdoteList;
