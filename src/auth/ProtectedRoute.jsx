import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Loader from "../components/common/Loader";
// import { useAuth } from "./useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader size="md" message="Loading..." />;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
