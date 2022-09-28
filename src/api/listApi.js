import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_ENDPOINT}/lists`;

/**
 * Loads all of the lists.
 * @returns {Promise<object[]>}
 **/
const getLists = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

/**
 * Loads the list.
 * @param {number} id - The id of the list to load.
 * @returns {Promise<object>}
 **/
const getList = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`);
  return data;
};

const api = {
  getLists,
  getList,
};

export default api;
