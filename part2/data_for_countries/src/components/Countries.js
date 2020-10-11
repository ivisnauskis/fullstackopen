import React from "react";
import Country from "./Country";

const Countries = ({ countriesToShow }) => {
  return (
    <div>
      {countriesToShow.length > 10 ? (
        "Too many matches, specify another filter"
      ) : countriesToShow.length === 1 ? (
        <Country country={countriesToShow[0]} />
      ) : (
        countriesToShow.map((c) => <p key={c.alpha3Code}>{c.name}</p>)
      )}
    </div>
  );
};
export default Countries;
