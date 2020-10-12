import React, { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import NumbersList from "./components/NumbersList";
import PhoneBookService from "./services/PhoneBookService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("new name");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    PhoneBookService.getAll().then((data) => setPersons(data));
  }, []);

  const handleAddClick = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: number,
    };
    if (persons.find((p) => p.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    PhoneBookService.create(person).then((data) => {
      setPersons(persons.concat(data));
      setNewName("");
      setNumber("");
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handlePersonDelete = (person) => {
    const shouldDelete = window.confirm(`Delete ${person.name}?`);

    if (shouldDelete) {
      PhoneBookService.remove(person.id);
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        number={number}
        handleNumberChange={handleNumberChange}
        handleAddClick={handleAddClick}
      />
      <NumbersList
        personsToShow={personsToShow}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
