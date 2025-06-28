import axios from "axios";

const BASE_URL = `http://localhost:3000/api`;
const PostOvertime = async ({ formData }) => {
  try {
    const response = await axios.post(`${BASE_URL}/overtime`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      status: response.data.status,
      message: response.data.message,
    };
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

const GetDetailOvertime = async ({ id }) => {
  try {
    const response = await axios.get(`${BASE_URL}/overtime/${id}`);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

const UpdateOvertime = async ({ formData, id }) => {
  try {
    const response = await axios.put(`${BASE_URL}/overtime/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  PostOvertime,
  GetOvertime,
  GetDetailOvertime,
  UpdateOvertime,
};
