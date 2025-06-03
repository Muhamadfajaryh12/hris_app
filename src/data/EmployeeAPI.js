import axios from "axios";

const EmployeeAPI = (() => {
  const BASE_URL = "http://localhost:3000/api";
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

  return {
    PostEmployee,
  };
})();

export default EmployeeAPI;
