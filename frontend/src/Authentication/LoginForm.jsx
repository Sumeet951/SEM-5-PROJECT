import { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/user/login",
        {
          email: loginData.email,
          password: loginData.password,
        },
        { withCredentials: true }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="tab-pane fade show active" id="login" role="tabpanel">
      <form onSubmit={handleLoginSubmit} className="d-flex flex-column gap-3">
        <input
          type="email"
          name="email"
          value={loginData.email}
          className="form-control rounded-pill"
          placeholder="Email"
          onChange={handleLoginChange}
        />
        <input
          type="password"
          name="password"
          value={loginData.password}
          className="form-control rounded-pill"
          placeholder="Password"
          onChange={handleLoginChange}
        />
        <button type="submit" className="btn btn-primary rounded-pill w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
