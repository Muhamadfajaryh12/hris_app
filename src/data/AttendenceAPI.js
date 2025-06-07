import axios from "axios";

const AttendenceAPI = (() => {
  const BASE_URL = "http://localhost:3000/api";

  const InsertAttendence = async ({ userId, time_in }) => {
    try {
      const response = await axios.post(`${BASE_URL}/attendence`, {
        userId,
        time_in,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateAttendence = async ({ id, time_out }) => {
    try {
      const response = await axios.put(`${BASE_URL}/attendence/${id}`, {
        time_out,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    InsertAttendence,
    UpdateAttendence,
  };
})();

export default AttendenceAPI;
