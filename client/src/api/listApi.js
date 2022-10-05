import { ApiError } from 'api';

const baseUrl = `${process.env.REACT_APP_API_ENDPOINT}/lists`;

/**
 * Loads all of the lists.
 * @returns {Promise<object[]>}
 **/
const getLists = async () => {
  const response = await fetch(baseUrl);

  if(!response.ok){
    throw ApiError.createFromFetchResponse(response);
  }

  return await response.json();
};

/**
 * Loads the list.
 * @param {number} id - The id of the list to load.
 * @returns {Promise<object>}
 **/
const getList = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);

  if(!response.ok){
    throw ApiError.createFromFetchResponse(response);
  }

  return await response.json();
};

const api = {
  getLists,
  getList,
};

export default api;
