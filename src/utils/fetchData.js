import axios from 'axios';

export const fetchData = async (url, params = {}) => {
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (err) {
        throw err;
    }
};
