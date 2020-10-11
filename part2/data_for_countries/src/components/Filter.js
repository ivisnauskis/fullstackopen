import React from "react";

const Filter = ({ onChange, value }) => {
  return (
    <div>
      find countries
      <input value={value} onChange={onChange}></input>
    </div>
  );
};

export default Filter;
