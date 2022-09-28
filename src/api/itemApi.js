import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_ENDPOINT;

const itemBaseUrl = (itemId) => `${apiBaseUrl}/items/${itemId}`;
const listItemsUrl = (listId) => `${apiBaseUrl}/lists/${listId}/items`;

/**
 * Loads all of the items in a list.
 * @param {listId} - The id of the list to load items for.
 * @returns {Promise<object[]>}
 **/
const getItems = async (listId) => {
  const { data } = await axios.get(listItemsUrl(listId));
  return data;
};

const api = {
  getItems,
};

export default api;
