import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const PostSection = async ({ section }) => {
  try {
    const response = await axios.post(`${BASE_URL}/section`, {
      section,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const GetSection = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/section`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const GetDetailSection = async ({ id }) => {
  try {
    const response = await axios.get(`${BASE_URL}/section/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const UpdateSection = async ({ id, section }) => {
  try {
    const response = await axios.put(`${BASE_URL}/section/${id}`, { section });
    return {
      status: response.data.status,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    console.log(error);
  }
};

const DeleteSection = async ({ id }) => {
  try {
    const response = await axios.delete(`${BASE_URL}/section/${id}`);
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
  PostSection,
  GetSection,
  GetDetailSection,
  UpdateSection,
  DeleteSection,
};
