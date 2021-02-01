const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return state.concat(action.data);

    case "INIT_NOTES":
      return action.data;

    case "TOGGLE_IMPORTANCE":
      const id = action.data.id;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((n) => (n.id !== id ? n : changedNote));

    default:
      return state;
  }
};

const generateID = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

export const createNote = (data) => {
  return {
    type: "NEW_NOTE",
    data,
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    data: { id },
  };
};

export const initializeNotes = (notes) => {
  return {
    type: "INIT_NOTES",
    data: notes,
  };
};

export default noteReducer;
