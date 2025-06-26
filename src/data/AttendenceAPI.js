import axios from "axios";

const AttendenceAPI = (() => {
  const BASE_URL = "http://localhost:3000/api";

  const GetAttendence = async ({ id }) => {
    try {
      const response = await axios.get(`${BASE_URL}/attendence?id=${id}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const InsertAttendence = async ({ userId, time_in }) => {
    try {
      const response = await axios.post(`${BASE_URL}/attendence`, {
        userId,
        time_in,
      });

      return {
        status: response.data.status,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateAttendence = async ({ id, time_out, emotion }) => {
    try {
      const response = await axios.put(`${BASE_URL}/attendence/${id}`, {
        time_out,
        emotion,
      });
      return {
        status: response.data.status,
        data: response.data.data,
        message: response.data.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const GetSummaryAttendence = async ({ year, month }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/attendence/summary?year=${year}&month=${month}`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    InsertAttendence,
    UpdateAttendence,
    GetAttendence,
    GetSummaryAttendence,
  };
})();

export default AttendenceAPI;
