const { default: axios } = require("axios");

const BASE_URL = "http://localhost:3000/api";

const Login = async ({ npk, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      npk,
      password,
    });
    return {
      status: response?.data?.status,
      message: response?.data?.message,
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  Login,
};
