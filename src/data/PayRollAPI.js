const { default: axios } = require("axios");

const BASE_URL = "http://localhost:3000/api";

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

export default {
  PostPayRoll,
};
