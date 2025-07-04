import axios from "axios";

const BASE_URL = `http://localhost:3000/api`;

const GetAnnualLeave = async ({ id }) => {
  try {
    const response = await axios.get(`${BASE_URL}/annual_leave?id=${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const PostAnnualLeave = async ({
  reason,
  date_start,
  date_end,
  type,
  data_count,
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/annual_leave`, {
      reason,
      date_start,
      date_end,
      type,
      data_count,
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

const GetDetailAnnualLeave = async ({ id }) => {
  try {
    const response = await axios.get(`${BASE_URL}/annual_leave/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const UpdateAnnualLeave = async ({
  id,
  approval_hrd,
  approval_leader,
  status,
  reason,
  date_start,
  date_end,
  type,
  data_count,
  hrdId,
  leaderId,
}) => {
  try {
    const response = await axios.put(`${BASE_URL}/annual_leave/${id}`, {
      approval_hrd,
      approval_leader,
      status,
      reason,
      date_start,
      date_end,
      type,
      data_count,
      hrdId,
      leaderId,
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

const DeleteAnnualLeave = async ({ id }) => {
  try {
    const response = await axios.delete(`${BASE_URL}/annual_leave/${id}`);
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
  PostAnnualLeave,
  GetAnnualLeave,
  GetDetailAnnualLeave,
  UpdateAnnualLeave,
  DeleteAnnualLeave,
};
