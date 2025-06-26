import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import NotFound from "../pages/misc/NotFound.jsx";
import Unauthorized from "../pages/misc/Unauthorized.jsx";

import Dashboard from "../pages/customer/Dashboard.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";

import RequestDeposit from "../pages/customer/RequestDeposit.jsx";
import TransferFunds from "../pages/customer/TransferFunds.jsx";
import Transactions from "../pages/customer/Transactions.jsx";
import GuestLayout from "../layouts/GuestLayout.jsx";
import CustomerLayout from "../layouts/CustomerLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import ProtectedRoute from "../auth/ProtectedRoute.jsx";
import RoleRoute from "../auth/RoleRoute.jsx";
import Accounts from "../pages/customer/Accounts.jsx";
import PendingAccounts from "../pages/admin/PendingAccounts.jsx";
import PendingTransactions from "../pages/admin/PendingTransactions.jsx";
import ManageUsers from "../pages/admin/ManageUsers.jsx";
import RequestWithdraw from "../pages/customer/RequestWithdraw.jsx";
import AccountDetails from "../pages/customer/AccountDetails.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import AdminActions from "../pages/admin/AdminActions.jsx";
import Home from "../pages/misc/Home.jsx";
import UserProfile from "../pages/profile/UserProfile.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* 🔒 Shared Protected Route for all authenticated users */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* 👤 Customer Protected Routes (Nested Layout) */}
      <Route
        element={
          <ProtectedRoute>
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/deposit" element={<RequestDeposit />} />
        <Route path="/withdraw" element={<RequestWithdraw />} />
        <Route path="/transfer" element={<TransferFunds />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/accounts/:accountNumber" element={<AccountDetails />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <RoleRoute role="ADMIN">
            <AdminLayout />
          </RoleRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="pending-accounts" element={<PendingAccounts />} />
        <Route path="pending-transactions" element={<PendingTransactions />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="actions" element={<AdminActions />} />
      </Route>

      {/* Password Reset Routes */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Utility Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
