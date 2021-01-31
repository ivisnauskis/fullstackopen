import React from "react";
import NewNote from "./componenets/NewNote";
import Notes from "./componenets/Notes";
import VisibilityFilter from "./componenets/VisibilityFilter";

const App = () => {
  return (
    <div>
      <VisibilityFilter />
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
