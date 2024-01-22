import axios from 'axios';

export const fetchData = async (
  endpoint,
  method = 'GET',
  data = null,
  params = null
) => {
  try {
    const response = await axios({
      method: method,
      url: `${process.env.REACT_APP_API_URL}${endpoint}`,
      data: data,
      params: params,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
