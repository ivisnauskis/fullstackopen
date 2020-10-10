import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("new name");

  const handleAddClick = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
    };

    setPersons(persons.concat(person));
    setNewName("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAddClick}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((p) => (
          <div key={p.name}>{p.name}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
