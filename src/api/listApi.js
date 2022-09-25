import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_ENDPOINT}/lists`;

/**
 * Loads all of the lists.
 * @returns {array}
 **/
export async function getLists() {
  const { data } = await axios.get(baseUrl);
  return data;
}
