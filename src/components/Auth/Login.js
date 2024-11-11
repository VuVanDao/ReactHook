import { useState } from "react";
import "./login.scss";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    alert("login");
  };
  return (
    <div className="login-container">
      <div className="header">Dont't have account yet?</div>
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
        <div>
          <button
            className="btn btn-submit btn-dark"
            onClick={() => handleLogin()}
          >
            Login to Typeform
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
