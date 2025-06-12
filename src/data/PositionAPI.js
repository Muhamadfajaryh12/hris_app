const { default: axios } = require("axios");

const BASE_URL = `http://localhost:3000/api`;
const PostPosition = async ({ position }) => {
  try {
    const response = await axios.post(`${BASE_URL}/position`, {
      position,
    });

    return {
      message: response.data.message,
      status: response.data.status,
    };
  } catch (error) {
    console.log(error);
  }
};

const GetPosition = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/position`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export default { PostPosition, GetPosition };
