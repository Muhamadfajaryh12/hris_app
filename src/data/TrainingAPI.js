const { default: axios } = require("axios");

const BASE_URL = "http://localhost:3000/api";

const PostTraining = async ({ formData }) => {
  try {
    const response = await axios.post(`${BASE_URL}/training`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return {
      status: response.data.status,
      message: response.data.message,
    };
  } catch (error) {
    console.log(error);
  }
};

const GetTraining = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/training`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const GetDetailTraining = async ({ id }) => {
  try {
    const response = await axios.get(`${BASE_URL}/training/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const UpdateTraining = async ({ formData, id }) => {
  try {
    const response = await axios.put(`${BASE_URL}/training/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return {
      status: response.data.status,
      message: response.data.message,
    };
  } catch (error) {
    console.log(error);
  }
};

const DeleteTraining = async ({ id }) => {
  try {
    const response = await axios.delete(`${BASE_URL}/training/${id}`);
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
  PostTraining,
  GetTraining,
  GetDetailTraining,
  UpdateTraining,
  DeleteTraining,
};
