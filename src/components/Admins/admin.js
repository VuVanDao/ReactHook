import { useState } from "react";
import SideBar from "./SideBar";
import "./admin.scss";
import { FaHeart, FaBars } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className="admin-container">
        <div className="admin-sidebar">
          <SideBar collapsed={collapsed} />
        </div>
        <div className="admin-content">
          <div className="admin-header">
            <FaBars onClick={() => setCollapsed(!collapsed)} />
          </div>
          <div className="admin-main">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
export default Admin;
