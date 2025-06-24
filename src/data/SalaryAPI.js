const { default: axios } = require("axios");

const BASE_URL = `http://localhost:3000/api`;

const GetSalary = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/salary`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const GetDetailSalary = async ({ id }) => {
  try {
    const response = await axios.get(`${BASE_URL}/salary/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const PostSalary = async ({
  basic_salary,
  increase_salary,
  total_salary,
  start_date,
  end_date,
  employeeId,
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/salary`, {
      basic_salary,
      increase_salary,
      total_salary,
      start_date,
      end_date,
      employeeId,
    });
    return {
      data: response.data.data,
      message: response.data.message,
      status: response.data.status,
    };
  } catch (error) {
    console.log(error);
  }
};

const UpdateSalary = async ({
  basic_salary,
  increase_salary,
  total_salary,
  start_date,
  end_date,
  employeeId,
  id,
}) => {
  try {
    const response = await axios.put(`${BASE_URL}/salary/${id}`, {
      basic_salary,
      increase_salary,
      total_salary,
      start_date,
      end_date,
      employeeId,
    });
    return {
      data: response.data.data,
      message: response.data.message,
      status: response.data.status,
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  GetSalary,
  GetDetailSalary,
  PostSalary,
  UpdateSalary,
};
