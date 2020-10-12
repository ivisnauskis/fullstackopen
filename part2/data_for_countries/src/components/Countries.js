import React from "react";
import Country from "./Country";

const Countries = ({ countriesToShow, onShowClick }) => {
  if (countriesToShow.length > 10) {
    return <div>"Too many matches, specify another filter"</div>;
  }

  if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]} />;
  }

  if (countriesToShow.length === 0) {
    return <div>No countries found!</div>;
  }

  return (
    <div>
      {countriesToShow.map((c) => {
        return (
          <div key={c.alpha3Code}>
            {c.name}
            <button onClick={() => onShowClick(c.name)}>show</button>
          </div>
        );
      })}
    </div>
  );
};
export default Countries;
