import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { loginUser } from "../api/auth.api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/users/me");
      // console.log("User fetched:", res.data);

      if (!res.data) throw new Error("No user data found");

      setUser(res.data);
      return res.data;
    } catch (err) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    await loginUser(credentials);
    const user = await fetchUser();
    return user;
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setUser(null);
  };

  const isAdmin = user?.role === "ADMIN";
  const isCustomer = user?.role === "CUSTOMER";
  const isAuthenticated = !!user;

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated,
        isAdmin,
        isCustomer,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Named exports only
export { AuthProvider, AuthContext };

// ✅ Custom hook (keep this as named export too)
export const useAuth = () => useContext(AuthContext);
