import React, { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import NumbersList from "./components/NumbersList";
import PhoneBookService from "./services/PhoneBookService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("new name");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("GETTING");
    PhoneBookService.getAll().then((data) => setPersons(data));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const createNotification = (isSuccessful, notification) => {
    setIsError(!isSuccessful);
    setNotification(notification);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const clearInputForm = () => {
    setNewName("");
    setNumber("");
  };

  const handleAddClick = (event) => {
    event.preventDefault();

    const person = {
      name: newName.trim(),
      number: number,
    };

    const existingPerson = persons.find(
      (p) => p.name.toLowerCase().trim() === newName.toLowerCase().trim()
    );

    if (existingPerson) {
      const shouldUpdate = window.confirm(
        `${person.name} is already added to phone book, replace the old number with a new one?`
      );
      if (shouldUpdate) {
        PhoneBookService.update(existingPerson.id, {
          ...existingPerson,
          number,
        })
          .then((data) => {
            setPersons(
              persons.map((p) => (p.id === existingPerson.id ? data : p))
            );
            createNotification(true, `${data.name} number has been updated.`);
            clearInputForm();
          })
          .catch((error) => {
            console.log(error);
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
            createNotification(
              false,
              `${person.name} has already been deleted from server.`
            );
          });
      }
    } else {
      PhoneBookService.create(person)
        .then((data) => {
          setPersons(persons.concat(data));
          createNotification(true, `${data.name} has been added!`);
          clearInputForm();
        })
        .catch((error) => {
          const errorMessage = error.response.data.error;
          console.log(errorMessage);
          createNotification(false, errorMessage);
        });
    }
  };

  const handlePersonDelete = (person) => {
    const shouldDelete = window.confirm(`Delete ${person.name}?`);

    if (shouldDelete) {
      PhoneBookService.remove(person.id).catch((error) =>
        console.log("already deleted from server.")
      );
      console.log("before delete filter", persons);
      setPersons(persons.filter((p) => p.id !== person.id));
      console.log("after delete filter", persons);
      createNotification(true, `${person.name} has been deleted!`);
    }
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );
  console.log("persons to show in app", personsToShow);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isError={isError} />
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
