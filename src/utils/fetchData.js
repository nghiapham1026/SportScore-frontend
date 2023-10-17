import axios from 'axios';

const { API_URL } = require("./constants");

export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${API_URL}${endpoint}`);
        console.log(response.data);
        return response.data;
    } catch (err) {
        throw err;
    }
};
