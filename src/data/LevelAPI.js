import axios from "axios";

const BASE_URL = "http://localhost:3000/api";
const PostLevel = async ({ level }) => {
  try {
    const response = await axios.post(`${BASE_URL}/level`, {
      level,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const GetLevel = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/level`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  PostLevel,
  GetLevel,
};
