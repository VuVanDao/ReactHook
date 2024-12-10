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
import ListQuiz from "./components/Users/ListQuiz";
import DetailQuiz from "./components/Users/DetailQuiz";
import ManageQuiz from "./components/Admins/Content/Quiz/ManageQuiz";
import Questions from "./components/Question/Questions";
import Test1 from "./routes/Test1";
import PrivateRoute from "./routes/PrivateRoute";
const NotFound = () => {
  return (
    <div
      style={{ margin: "auto", width: "1000px", textAlign: "center" }}
      className="alert alert-danger mt-5"
    >
      ERROR 404 NOT FOUND PAGE
    </div>
  );
};
const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <ListQuiz />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />
        <Route
          path="admins"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-quizzes" element={<ManageQuiz />} />
          <Route path="manage-questions" element={<Questions />} />
          <Route path="login" element={<Login />}></Route>
          {/* cai nay la nghich */}
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/test" element={<PrivateRoute />}></Route>
        <Route path="*" element={<NotFound />}></Route>
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
