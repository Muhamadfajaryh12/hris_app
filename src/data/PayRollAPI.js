const { default: axios } = require("axios");

const BASE_URL = "http://localhost:3000/api";

const GetPayRoll = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/payroll`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const GetDetailPayroll = async ({ id }) => {
  try {
    const response = await axios.get(`${BASE_URL}/payroll/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
const PostPayRoll = async ({
  period_month,
  period_year,
  bonus,
  bonus_overtime,
  deduction_bpjs,
  deduction_pph,
  deduction_attendence,
  total_salary,
  employeeId,
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/payroll`, {
      period_month,
      period_year,
      bonus,
      bonus_overtime,
      deduction_bpjs,
      deduction_pph,
      deduction_attendence,
      total_salary,
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

const UpdatePayRoll = async ({ id, bonus, status, total_salary }) => {
  try {
    const response = await axios.put(`${BASE_URL}/payroll/${id}`, {
      status,
      bonus,
      total_salary,
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

const DeletePayroll = async ({ id }) => {
  try {
    const response = await axios.delete(`${BASE_URL}/payroll/${id}`);
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
  PostPayRoll,
  GetPayRoll,
  GetDetailPayroll,
  UpdatePayRoll,
  DeletePayroll,
};
