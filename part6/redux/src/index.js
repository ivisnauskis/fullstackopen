import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import noteReducer from "./reducers/noteReducer";
import App from "./App";
import { Provider } from "react-redux";

const store = createStore(noteReducer);

store.dispatch({
  type: "NEW_NOTE",
  data: {
    content: "thep app state is in redux store",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  data: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
