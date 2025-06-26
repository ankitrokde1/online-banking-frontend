import AppNavbar from "../components/common/Navbar.jsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <AppNavbar />
        <Outlet />
      {/* <div className="container mt-4">
      </div> */}
    </>
  );
};

export default AdminLayout;
