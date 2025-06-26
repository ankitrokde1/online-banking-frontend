import axios from "./axiosInstance";

// Deposit & Withdraw requests
export const requestDeposit = async (data) => {
  return axios.post("/transactions/request-deposit", data);
};

export const requestWithdraw = async (data) => {
  return axios.post("/transactions/request-withdraw", data);
};

// Transfer funds
export const transferFunds = async (data) => {
  return axios.post("/transactions/transfer", data);
};

// Get transactions for a specific account
export const getTransactions = async (accountNumber) => {
  return axios.get(`/transactions/${accountNumber}`);
};
