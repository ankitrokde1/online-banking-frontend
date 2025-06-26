import AppNavbar from "../components/common/Navbar.jsx";
import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
  return (
    <>
      <AppNavbar />
      <Outlet />
      {/* <div className="container mt-4">
      </div> */}
    </>
  );
};

export default CustomerLayout;
