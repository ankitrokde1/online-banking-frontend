import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx"; // ✅ correct import
import Loader from "../components/common/Loader.jsx";

const RoleRoute = ({ children, role }) => {
  // const { user, loading } = useAuth();

  // if (loading) return <div>Loading...</div>;
  try {
    const { user, loading } = useAuth();
    if (loading) return <Loader size="md" message="Loading..." />;
    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== role) return <Navigate to="/unauthorized" replace />;
    return children;
  } catch (err) {
    console.error("RoleRoute error:", err);
    return <Navigate to="/login" replace />;
  }

  // if (!user) return <Navigate to="/login" replace />;

  // if (user.role !== role) return <Navigate to="/unauthorized" replace />;

  // return children;
};

export default RoleRoute;
