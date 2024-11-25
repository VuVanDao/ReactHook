import { useState } from "react";
import SideBar from "./SideBar";
import "./admin.scss";
import { FaHeart, FaBars } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PerfectScrollBar from "react-perfect-scrollbar";
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className="admin-container">
        <div className="admin-sidebar">
          <SideBar collapsed={collapsed} /> {/* sidebar */}
        </div>
        <div className="admin-content">
          <div className="admin-header">
            <FaBars onClick={() => setCollapsed(!collapsed)} />
            {/* dong , mo sidebar */}
          </div>
          <div className="admin-main">
            <PerfectScrollBar>
              {/* noi chua route con cua admin */}
              <Outlet />
            </PerfectScrollBar>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
