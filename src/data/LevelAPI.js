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

const GetDetailLevel = async ({ id }) => {
  try {
    const response = await axios.get(`${BASE_URL}/level/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const UpdateLevel = async ({ id, level }) => {
  try {
    const response = await axios.put(`${BASE_URL}/level/${id}`, { level });
    return {
      message: response.data.emssage,
      data: response.data.data,
      status: response.data.status,
    };
  } catch (error) {
    console.log(error);
  }
};

const DeleteLevel = async ({ id }) => {
  try {
    const response = await axios.delete(`${BASE_URL}/level/${id}`);
    return {
      message: response.data.emssage,
      data: response.data.data,
      status: response.data.status,
    };
  } catch (error) {
    console.log(error);
  }
};
export default {
  PostLevel,
  GetLevel,
  GetDetailLevel,
  UpdateLevel,
  DeleteLevel,
};
