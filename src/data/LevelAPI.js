import axios from "axios";

const LevelAPI = (() => {
  const BASE_URL = "http://localhost:3000/api";
  const PostLevel = async ({ level }) => {
    try {
      const response = await axios.post(`${BASE_URL}/level`, {
        level,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    PostLevel,
  };
})();

export default LevelAPI;
