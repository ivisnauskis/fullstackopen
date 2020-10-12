import React from "react";

const PersonRecord = ({ person, handlePersonDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => handlePersonDelete(person)}>delete</button>
    </div>
  );
};

export default PersonRecord;
