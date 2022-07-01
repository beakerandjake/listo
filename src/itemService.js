import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const getItems = async () => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/items`);
        return response.data;
    } catch (error) {
        console.error('error!', error);
        throw new Error('Failed to load items.');
    }
}

const addItem = async (name) => {
    try {
        const { data: newItem } = await axios.post(`${API_ENDPOINT}/items`, { name: name });
        console.log('got a new item', newItem);
        return newItem;
    } catch (error) {
        console.error('error!', error);
        throw new Error('Failed to add item.');
    }
}

const itemService = {
    getItems,
    addItem
};

export default itemService;