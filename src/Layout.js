import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import User from "./components/Users/user";
import Admin from "./components/Admins/admin";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admins/Content/ManageUser";
import DashBoard from "./components/Admins/Content/DashBoard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<User />} />
        </Route>
        <Route path="admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="login" element={<Login />}></Route>{" "}
          {/* cai nay la nghich */}
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
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
export default Layout;
