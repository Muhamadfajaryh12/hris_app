const { default: axios } = require("axios");

const BASE_URL = "http://localhost:3000/api";

const getDashboard = async ({ date }) => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard?date=${date}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getDashboard,
};
