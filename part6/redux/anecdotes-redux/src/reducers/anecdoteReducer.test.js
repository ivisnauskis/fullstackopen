import anecdoteReducer, { voteFor, create } from "./anecdoteReducer";
import deepFreeze from "deep-freeze";

describe("anecdoteReducer", () => {
  test("returns new state with action VOTE", () => {
    const state = [
      {
        content: "Anecdote",
        id: 1,
        votes: 0,
      },
    ];

    deepFreeze(state);
    const newState = anecdoteReducer(state, voteFor(1));

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual({ ...state[0], votes: 1 });
  });

  test("returns new state with action CREATE", () => {
    const state = [];
    const action = create("new anecdote");

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.data);
  });
});
