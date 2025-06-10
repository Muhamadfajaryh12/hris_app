const { default: axios } = require("axios");

const BASE_URL = "http://localhost:3000/api";

const GetShift = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/shift`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
const PostShift = async ({ title, work_time }) => {
  try {
    const response = await axios.post(`${BASE_URL}/shift`, {
      title,
      work_time,
    });

    return {
      message: response.data.message,
      status: response.data.status,
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  PostShift,
  GetShift,
};
