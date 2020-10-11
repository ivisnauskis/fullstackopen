import React from "react";
import Country from "./Country";

const Countries = ({ countriesToShow, onShowClick }) => {
  return (
    <div>
      {countriesToShow.length > 10 ? (
        "Too many matches, specify another filter"
      ) : countriesToShow.length === 1 ? (
        <Country country={countriesToShow[0]} />
      ) : (
        countriesToShow.map((c) => {
          return (
            <div key={c.alpha3Code}>
              {c.name}
              <button onClick={() => onShowClick(c.name)}>show</button>
            </div>
          );
        })
      )}
    </div>
  );
};
export default Countries;
