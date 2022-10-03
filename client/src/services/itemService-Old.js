import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const getItems = async () => {
  try {
    let { data: items } = await axios.get(`${API_ENDPOINT}/items`);
    items = items.map((x) => ({ ...x, completed: false }));
    return items;
  } catch (error) {
    console.error('get items failed:', error);
    throw new Error('Failed to load items.');
  }
};

const addItem = async (name) => {
  try {
    const { data: newItem } = await axios.post(`${API_ENDPOINT}/items`, {
      name: name,
    });
    return newItem;
  } catch (error) {
    console.error('add item failed:', error);
    throw new Error('Failed to add item.');
  }
};

const deleteItem = async (id) => {
  try {
    // await axios.delete(`${API_ENDPOINT}/items/${id}`)
    return Promise.resolve();
  } catch (error) {
    console.error('delete failed:', error);
    throw new Error('Failed to delete item.');
  }
};

const editItem = async (id, quantity) => {
  try {
    await axios.patch(`${API_ENDPOINT}/items/${id}`, {
      quantity: quantity,
    });
  } catch (error) {
    console.error('edit item failed:', error);
    throw new Error('Failed to edit item.');
  }
};

const itemService = {
  getItems,
  addItem,
  deleteItem,
  editItem,
};

export default itemService;
