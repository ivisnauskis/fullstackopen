import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import CountriesService from "./services/CountriesService";
import Countries from "./components/Countries";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    CountriesService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  const countriesToShow = filter
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(filter.toLowerCase())
      )
    : countries;

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const onShowClick = (value) => {
    setFilter(value);
  };

  return (
    <div>
      <Filter onChange={onFilterChange} value={filter} />
      <Countries countriesToShow={countriesToShow} onShowClick={onShowClick} />
    </div>
  );
};

export default App;
