import React from "react";
import { connect } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import Note from "./Note";

const Notes = (props) => {
  return (
    <ul>
      {props.notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => props.toggleImportanceOf(note.id)}
        />
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => {
  if (state.filter === "ALL") {
    return { notes: state.notes };
  }
  return state.filter === "IMPORTANT"
    ? { notes: state.notes.filter((note) => note.important) }
    : { notes: state.notes.filter((note) => !note.important) };
};

const mapDispatchToProps = {
  toggleImportanceOf,
};

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes);
export default ConnectedNotes;
