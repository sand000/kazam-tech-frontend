import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchAllTasks = async () => {
  const res = await API.get("/task/fetchAllTasks");
  return res.data.tasks;
};
