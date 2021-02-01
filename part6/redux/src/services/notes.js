import axios from "axios";

const baseUrl = "http://localhost:3001/notes/";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const noteObject = { content, important: false };
  const response = await axios.post(baseUrl, noteObject);
  return response.data;
};

const toggleImportace = async (id) => {
  const url = baseUrl + id;
  const noteObject = (await axios.get(url)).data;
  const response = await axios.put(url, {
    ...noteObject,
    important: !noteObject.important,
  });

  return response.data;
};

export default { getAll, createNew, toggleImportace };
