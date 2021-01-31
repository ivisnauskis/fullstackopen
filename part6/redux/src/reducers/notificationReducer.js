const initialState = {
  message: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...state,
        message: action.data.message,
      };

    default:
      return state;
  }
};

export const setNotification = (message) => {
  return {
    type: "SET_NOTIFICATION",
    data: {
      message,
    },
  };
};

export default reducer;
