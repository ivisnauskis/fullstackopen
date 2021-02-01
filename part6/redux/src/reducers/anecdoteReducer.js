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
  return {
    type: "VOTE",
    data: {
      id: id,
    },
  };
};

export const create = (data) => {
  return {
    type: "CREATE",
    data,
  };
};

export const initAnecdotes = (data) => {
  return {
    type: "INIT_ANECDOTES",
    data,
  };
};

export default reducer;
