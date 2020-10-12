import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=`;

const getCurrentWeather = (cityName) => {
  return axios.get(`${url}${cityName}`).then((response) => response.data);
};

export default { getCurrentWeather };
