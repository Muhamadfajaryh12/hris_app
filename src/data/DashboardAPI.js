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
const getAnalyticDashboard = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/employee/dashboard`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getDashboard,
  getAnalyticDashboard,
};
