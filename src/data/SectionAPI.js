import axios from "axios";

const SectionAPI = (() => {
  const BASE_URL = "http://localhost:3000/api";

  const PostSection = async ({ section }) => {
    try {
      const response = await axios.post(`${BASE_URL}/section`, {
        section,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    PostSection,
  };
})();

export default SectionAPI;
