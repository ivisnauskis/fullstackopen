import React from "react";

const Filter = ({ onChange }) => {
  return (
    <div>
      find countries
      <input onChange={onChange}></input>
    </div>
  );
};

export default Filter;
