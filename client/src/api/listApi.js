import { ApiError } from 'api';
import { apiBaseUrl } from './apiConfig';

const baseUrl = `${apiBaseUrl}/lists`;

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
 * @param {object} list - The list to edit.
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

/**
 * Deletes a list.
 * @param {number} id - The list to delete.
 **/
const deleteList = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }
};

const api = {
  getLists,
  getList,
  createList,
  editList,
  deleteList,
};

export default api;
