import axios from "./axiosInstance";

// Get pending account requests
export const getPendingAccounts = async () => {
  return axios.get("/admin/request-accounts");
};

// Get pending transaction requests
export const getPendingTransactions = async () => {
  return axios.get("/admin/pending-transactions");
};

// Process account request
export const processAccount = async (accountId, action) => {
  return axios.put(
    `/admin/requests-account-process/${accountId}?approve=${action}`
  );
};

// Process transaction request
export const processTransaction = async (transactionId, action) => {
  return axios.post(
    `/admin/process/transaction/${transactionId}?action=${action}`
  );
};

// Get all users
export const getAllUsers = () => axios.get("/admin/get-all-users");

// delete a user
export const deleteUser = (userId) => axios.delete(`/users/${userId}`);

// update user role
export const updateUser = (id, data) => axios.put(`/users/${id}`, data);

export const getUser = (id) => axios.get(`/admin/get-user/${id}`);
