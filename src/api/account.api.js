import axios from "./axiosInstance";

// Request new account (CURRENT or SAVINGS)
export const requestAccount = async (type) => {
  return axios.post(`/accounts/create?accountType=${type}`);
};

// Get all accounts for logged-in user
export const getMyAccounts = async () => {
  return axios.get("/accounts");
};

// Get details for a single account
export const getAccountDetails = async (accountNumber) => {
  return axios.get(`/accounts/${accountNumber}`);
};

// Deactivate an account
export const deactivateAccount = async (accountNumber) => {
  return axios.put(`/accounts/deactivate/${accountNumber}`);
};

// Activate an account
export const activateAccount = async (accountNumber) => {
  return axios.put(`/accounts/activate/${accountNumber}`);
};
