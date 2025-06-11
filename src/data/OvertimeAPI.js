import axios from "axios";

const BASE_URL = `http://localhost:3000/api`;
const PostOvertime = async ({ formData }) => {
  try {
    const response = await axios.post(`${BASE_URL}/overtime`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const GetOvertime = async ({ url = "" }) => {
  try {
    const response = await axios.get(`${BASE_URL}/overtime${url}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export default { PostOvertime, GetOvertime };
