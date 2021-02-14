const initialState = {
  message: "",
  success: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        message: action.data.message,
        success: action.data.success,
      };
    case "CLEAR_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (notification) => {
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        message: notification.message,
        success: notification.success,
      },
    });

    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

export default reducer;
