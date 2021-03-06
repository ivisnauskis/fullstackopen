import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes/";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const anecdoteObj = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdoteObj);
  return response.data;
};

const voteFor = async (id) => {
  const anecdote = (await axios.get(baseUrl + id)).data;
  const response = await axios.put(baseUrl + id, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
  return response.data;
};

export default { getAll, create, voteFor };
