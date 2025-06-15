const { default: axios } = require("axios");

const BASE_URL = `http://localhost:3000/api`;
const PostPosition = async ({ position, base_salary }) => {
  try {
    const response = await axios.post(`${BASE_URL}/position`, {
      position,
      base_salary,
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

const GetDetailPosition = async ({ id }) => {
  try {
    const response = await axios.get(`${BASE_URL}/position/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const UpdatePosition = async ({ position, base_salary, id }) => {
  try {
    const response = await axios.put(`${BASE_URL}/position/${id}`, {
      position,
      base_salary,
    });

    return {
      message: response.data.message,
      status: response.data.status,
    };
  } catch (error) {
    console.log(error);
  }
};
export default { PostPosition, GetPosition, GetDetailPosition, UpdatePosition };
