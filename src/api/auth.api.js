import axios from "./axiosInstance";

export const loginUser = async (credentials) => {
  return axios.post("/auth/login", credentials);
};

export const logoutUser = async () => {
  return axios.post("/auth/logout");
};

export const registerUser = async (data) => {
  return axios.post("/auth/register", data);
};
