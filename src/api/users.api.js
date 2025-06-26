import axios from "./axiosInstance";

export const updateUserProfile = (userId, data) => {
  return axios.put(`/users/${userId}`, data).then((res) => res.data);
};
