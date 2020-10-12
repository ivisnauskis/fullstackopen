import React from "react";
import PersonRecord from "./PersonRecord";

const NumbersList = ({ personsToShow, handlePersonDelete }) => {
  return (
    <div>
      <h3>Numbers</h3>
      <div>
        {personsToShow.map((p) => (
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
