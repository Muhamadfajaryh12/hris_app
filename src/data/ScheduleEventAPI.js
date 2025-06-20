const { default: axios } = require("axios");

const BASE_URL = `http://localhost:3000/api`;

const GetSchedule = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/schedule`);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const GetScheduleDetail = async ({ id }) => {
  try {
    const response = await axios.get(`${BASE_URL}/schedule/${id}`);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const GetScheduleByDate = async ({ date }) => {
  try {
    const response = await axios.get(`${BASE_URL}/schedule?date=${date}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const PostSchedule = async ({
  title,
  date,
  date_end,
  hours_start,
  hours_end,
  description,
  category,
  sectionId,
  levelId,
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/schedule`, {
      title,
      date,
      date_end,
      hours_start,
      hours_end,
      description,
      category,
      sectionId,
      levelId,
    });

    return {
      data: response.data.data,
      status: response.data.status,
      message: response.data.message,
    };
  } catch (error) {
    console.log(error);
  }
};

const UpdateSchedule = async ({
  title,
  date,
  date_end,
  hours_start,
  hours_end,
  description,
  category,
  sectionId,
  levelId,
  id,
}) => {
  try {
    const response = await axios.put(`${BASE_URL}/schedule/${id}`, {
      title,
      date,
      date_end,
      hours_start,
      hours_end,
      description,
      category,
      sectionId,
      levelId,
    });

    return {
      data: response.data.data,
      status: response.data.status,
      message: response.data.message,
    };
  } catch (error) {
    console.log(error);
  }
};

const DeleteSchedule = async ({ id }) => {
  try {
    const response = await axios.delete(`${BASE_URL}/schedule/${id}`);
    return {
      data: response.data.data,
      status: response.data.status,
      message: response.data.message,
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  GetSchedule,
  PostSchedule,
  GetScheduleByDate,
  GetScheduleDetail,
  UpdateSchedule,
  DeleteSchedule,
};
