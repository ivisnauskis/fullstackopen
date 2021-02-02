const initialState = {
  message: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      clearTimeout(action.data.timerId);
      return {
        message: action.data.message,
      };

    case "CLEAR_NOTIFICATION":
      return initialState;

    default:
      return state;
  }
};

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        message,
        timerId: setTimeout(() => {
          dispatch(clearNotification());
        }, 1000 * seconds),
      },
    });
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

export default reducer;
