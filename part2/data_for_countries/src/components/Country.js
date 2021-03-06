import React from "react";
import CityWeather from "./CityWeather";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((l) => (
          <li key={l.iso639_1}>{l.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={country.name + " flag"}
        style={{ width: 100 }}
      />
      <CityWeather cityName={country.capital} />
    </div>
  );
};

export default Country;
