// import AppNavbar from "../components/common/Navbar.jsx";
import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  return (
    <>
      {/* <AppNavbar /> */}
        <Outlet />
        {/* <div className="">
      </div> */}
    </>
  );
};

export default GuestLayout;
