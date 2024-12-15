import { useState } from "react";
import SideBar from "./SideBar";
import "./admin.scss";
import { FaHeart, FaBars } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PerfectScrollBar from "react-perfect-scrollbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Languages from "../Header/Language";
import { useTranslation, Trans } from "react-i18next";
const Admin = () => {
  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState(false);
  const handleLogOut = () => {};
  return (
    <>
      <div className="admin-container">
        <div className="admin-sidebar">
          <SideBar collapsed={collapsed} />
          {/* sidebar */}
        </div>
        <div className="admin-content">
          <div className="admin-header">
            <span onClick={() => setCollapsed(!collapsed)}>
              <FaBars style={{ cursor: "pointer" }} className="left-side" />
            </span>
            {/* dong , mo sidebar */}
            <div className="right-side">
              <Languages />
              <NavDropdown
                title={t("header.settings.settings")}
                id="basic-nav-dropdown"
                className="mx-5"
              >
                <NavDropdown.Item href="#action/3.4">
                  {t("header.settings.profile")}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleLogOut()}>
                  {t("header.settings.logout")}
                </NavDropdown.Item>
              </NavDropdown>
            </div>
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
