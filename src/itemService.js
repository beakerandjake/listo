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

const itemService = {
    getItems
};

export default itemService;