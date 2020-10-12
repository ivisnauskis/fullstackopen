import React, { useEffect, useState } from "react";
import WeatherService from "../services/WeatherService";

const CityWeather = ({ cityName }) => {
  const [weather, setWeather] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    WeatherService.getCurrentWeather(cityName).then((data) => {
      setWeather({
        temperature: data.current.temperature,
        icon: data.current.weather_icons,
        wind: data.current.wind_speed,
        direction: data.current.wind_dir,
      });
      setLoaded(true);
    });
  }, [cityName]);

  return (
    loaded && (
      <div>
        <h2>Weather in {cityName}</h2>
        <p>Temperature: {weather.temperature} °C</p>
        <img src={weather.icon[0]} alt="icon" />
        <p>
          Wind {weather.wind} direction {weather.direction}
        </p>
      </div>
    )
  );
};

export default CityWeather;
