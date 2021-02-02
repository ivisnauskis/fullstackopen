import anecdoteService from "../services/anecdoteService";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      console.log(state);
      state = state.map((a) =>
        a.id !== action.data.id ? a : { ...a, votes: a.votes + 1 }
      );
      state.sort((a, b) => b.votes - a.votes);
      return state;

    case "INIT_ANECDOTES":
      return action.data;

    case "CREATE":
      return state.concat(action.data);

    default:
      return state;
  }
};

export const voteFor = (id) => {
  return async (dispatch) => {
    await anecdoteService.voteFor(id);
    dispatch({
      type: "VOTE",
      data: {
        id: id,
      },
    });
  };
};

export const create = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch({
      type: "CREATE",
      data: newAnecdote,
    });
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default reducer;
