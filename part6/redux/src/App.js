import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NewNote from "./componenets/NewNote";
import Notes from "./componenets/Notes";
import VisibilityFilter from "./componenets/VisibilityFilter";
import { initializeNotes } from "./reducers/noteReducer";
import noteService from "./services/notes";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("getting notes");
    noteService.getAll().then((notes) => dispatch(initializeNotes(notes)));
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
