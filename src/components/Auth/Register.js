import { useState } from "react";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../service/apiService";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Languages from "../Header/Language";
const Register = (props) => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChecked, setPasswordChecked] = useState("false");
  const handleLogin = async () => {
    //validate
    //submit
    let data = await postRegister(username, email, password);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <span>Already have an account?</span>
        <button className="btn btn-dark" onClick={() => navigate("/login")}>
          Login
        </button>
        <Languages />
      </div>
      <div className="register-title col-4  mx-auto">VuVanDao</div>
      <div className="register-welcome col-4  mx-auto">
        Get better data with conversational forms, surveys, quizzes & more.
      </div>
      <div className="register-content-form col-4 mx-auto">
        <div className="form-group">
          <label>UserName:</label>
          <input
            type={"text"}
            className="form-control"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email (*)</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>password (*)</label>
          <input
            type={passwordChecked === true ? "password" : "text"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {passwordChecked === true ? (
            <span
              className="check-password"
              onClick={() => setPasswordChecked(!passwordChecked)}
            >
              <FaEye /> Show password
            </span>
          ) : (
            <span
              className="check-password my-3"
              onClick={() => setPasswordChecked(!passwordChecked)}
            >
              <FaEyeSlash /> Hide password
            </span>
          )}
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button
            className="btn btn-submit btn-dark"
            onClick={() => handleLogin()}
          >
            Register to Typeform
          </button>
        </div>
        <div className="back text-center">
          <span onClick={() => navigate("/")}>&#60;&#60; Go to home page</span>
        </div>
      </div>
    </div>
  );
};
export default Register;
