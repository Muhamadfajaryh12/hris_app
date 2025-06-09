import axios from "axios";

const EmployeeAPI = (() => {
  const BASE_URL = "http://localhost:3000/api";
  const GetEmployee = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/employee`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const PostEmployee = async ({
    name,
    email,
    no_telp,
    npk,
    gender,
    levelId,
    sectionId,
    password,
  }) => {
    try {
      const response = await axios.post(`${BASE_URL}/employee`, {
        name,
        email,
        no_telp,
        npk,
        gender,
        levelId,
        sectionId,
        password,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  };

  const PutEmployee = async ({
    name,
    email,
    no_telp,
    npk,
    gender,
    levelId,
    sectionId,
    id,
  }) => {
    try {
      const response = await axios.put(`${BASE_URL}/employee/${id}`, {
        name,
        email,
        no_telp,
        npk,
        gender,
        levelId,
        sectionId,
      });

      return response.data;
    } catch (error) {
      return console.log(error);
    }
  };
  return {
    PostEmployee,
    PutEmployee,
    GetEmployee,
  };
})();

export default EmployeeAPI;
