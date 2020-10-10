import React from "react";

const NumbersList = ({ personsToShow }) => {
  return (
    <div>
      <h3>Numbers</h3>
      <div>
        {personsToShow.map((p) => (
          <div key={p.name}>
            {p.name} {p.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumbersList;
