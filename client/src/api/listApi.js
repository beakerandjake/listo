import { ApiError } from 'api';

const baseUrl = `${process.env.REACT_APP_API_ENDPOINT}/lists`;

/**
 * Loads all of the lists.
 * @returns {Promise<object[]>}
 **/
const getLists = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
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

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }

  return await response.json();
};

/**
 * Creates a new list
 * @param {object} list - The list to create.
 * @returns {Promise<object>}
 **/
const createList = async (list) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(list),
  });

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }

  return await response.json();
};

/**
 * Edit the specified list.
 * @param {object} list - The list to create.
 * @returns {Promise<object>}
 **/
const editList = async (id, changes) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changes),
  });

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }

  return await response.json();
};

const api = {
  getLists,
  getList,
  createList,
  editList,
};

export default api;
