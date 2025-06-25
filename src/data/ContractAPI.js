const { default: axios } = require("axios");

const BASE_URL = "http://localhost:3000/api";

const GetContract = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/contract`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const PostContract = async ({ formData }) => {
  try {
    const response = await axios.post(`${BASE_URL}/contract`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      status: response.data.status,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  GetContract,
  PostContract,
};
