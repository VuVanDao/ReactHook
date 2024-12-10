import { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../service/apiService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { doLogin } from "../../redux/action/userAction";
const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    //validate
    setIsLoadingData(true);
    //submit
    let data = await postLogin(email, password);
    if (data && +data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoadingData(false);
      navigate("/");
    } else {
      toast.error(data.EM);
      setIsLoadingData(false);
    }
  };
  const handleKeyDown = (event) => {
    if (event && event.keycode === 13) {
      handleLogin();
    }
  };
  return (
    <div className="login-container">
      <div className="header">
        <span>Dont't have account yet?</span>
        <button className="btn btn-dark" onClick={() => navigate("/register")}>
          Sign up
        </button>
      </div>
      <div className="title col-4  mx-auto">VuVanDao</div>
      <div className="welcome col-4  mx-auto">Hello , Who are you?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>password</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>

        <button
          className="btn btn-submit btn-dark"
          onClick={() => handleLogin()}
          disabled={isLoadingData}
          onKeyDown={(event) => handleKeyDown(event)}
        >
          {isLoadingData === true && <FaSpinner className="loaderIcon mx-1" />}
          Login to Typeform
        </button>

        <div className="back text-center">
          <span onClick={() => navigate("/")}>&#60;&#60; Go to home page</span>
        </div>
      </div>
    </div>
  );
};
export default Login;
