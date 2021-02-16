import notificationReducer from "./notificationReducer";
import blogsReducer from "./blogsReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
});

export default reducer;
