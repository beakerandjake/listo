import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_ENDPOINT;

const itemBaseUrl = (itemId) => `${apiBaseUrl}/items/${itemId}`;
const listItemsUrl = (listId) => `${apiBaseUrl}/lists/${listId}/items`;

/**
 * Loads all of the items in a list.
 * @param {number} listId - The id of the list to load items for.
 * @returns {Promise<object[]>}
 **/
const getItems = async (listId) => {
  const { data } = await axios.get(listItemsUrl(listId));
  return data;
};

/**
 * Add a new item to the list.
 * @param {number} listId - The id of the list.
 * @param {object} item - The item to add to the list.
 * @returns {Promise<object>}
 **/
const addItem = async (listId, item) => {
  const { data } = await axios.post(listItemsUrl(listId), item);
  return data;
};

/**
 * Deletes an item from the list.
 * @param {number} itemId - The id of the item.
 **/
const deleteItem = async (itemId) => {
  await axios.delete(itemBaseUrl(itemId));
};

/**
 * Edits an item.
 * @param {number} itemId - The id of the list.
 * @param {object} changes - The edits to apply to an item.
 * @returns {Promise<object>}
 **/
const editItem = async (itemId, changes) => {
  const { data } = await axios.patch(itemBaseUrl(itemId), changes);
  return data;
};

const api = {
  getItems,
  addItem,
  deleteItem,
  editItem,
};

export default api;
