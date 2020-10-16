import React from "react";
import PersonRecord from "./PersonRecord";

const NumbersList = ({ personsToShow, handlePersonDelete }) => {
  const persons = personsToShow.filter(Boolean);
  return (
    <div>
      <h3>Numbers</h3>
      <div>
        {persons.map((p) => (
          <PersonRecord
            key={p.id}
            person={p}
            handlePersonDelete={handlePersonDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default NumbersList;
