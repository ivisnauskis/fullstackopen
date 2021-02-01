import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NewNote from "./componenets/NewNote";
import Notes from "./componenets/Notes";
import VisibilityFilter from "./componenets/VisibilityFilter";
import { initializeNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <div>
      <VisibilityFilter />
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
