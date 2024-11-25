import React from "react";
import { useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import sidebarBg from "../../assets/bg2.jpg";
import "react-pro-sidebar/dist/css/styles.css";
import { AiFillAccountBook } from "react-icons/ai";
import "./SideBar.scss";
const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const Navigate = useNavigate();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        // rtl={rtl}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <AiFillAccountBook size={"3em"} />
            <span onClick={() => Navigate("/")} style={{ cursor: "pointer" }}>
              VanDao HeHe
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaTachometerAlt />}
              suffix={<span className="badge red">new</span>}
            >
              dashboard
              <Link to="/admins" />
            </MenuItem>
            <MenuItem icon={<FaGem />}>
              components
              <Link to="/" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              suffix={<span className="badge yellow">3</span>}
              icon={<FaGem />}
              title={"Feature"}
            >
              <MenuItem>
                Quản lí User <Link to="/admins/manage-users" />
              </MenuItem>
              <MenuItem>
                Quản lí Bài Quiz
                <Link to="/admins/manage-quizzes" />
              </MenuItem>
              <MenuItem>
                Quản lí Câu hỏi
                <Link to="/admins/manage-questions" />
              </MenuItem>

              <MenuItem>
                den trang login
                <Link to="/admins/login" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/VuVanDao"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                viewSource
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};
export default SideBar;
