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

export default { PostOvertime };
