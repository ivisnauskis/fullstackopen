import axios from "axios";

const url = "https://restcountries.eu/rest/v2/all";

const getAll = () => {
  return axios.get(url).then((response) => response.data);
};

export default { getAll };
