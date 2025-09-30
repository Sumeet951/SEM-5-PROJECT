import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default function AuthPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/user/register", {
        username: signupData.name,
        email: signupData.email,
        password : signupData.password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light "
      style={{ width: "100vh" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-100"
        style={{ maxWidth: "400px" }}
      >
        <div className="card shadow rounded-4 border-0">
          <div className="card-body p-4">
            <ul className="nav nav-tabs mb-4" id="authTab" role="tablist">
              <li className="nav-item w-50" role="presentation">
                <button
                  className="nav-link active w-100"
                  id="login-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#login"
                  type="button"
                  role="tab"
                >
                  Login
                </button>
              </li>
              <li className="nav-item w-50" role="presentation">
                <button
                  className="nav-link w-100"
                  id="signup-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#signup"
                  type="button"
                  role="tab"
                >
                  Sign Up
                </button>
              </li>
            </ul>

            <div className="tab-content" id="authTabContent">
              {/* Login Form */}
              <div
                className="tab-pane fade show active"
                id="login"
                role="tabpanel"
              >
                <form
                  onSubmit={handleLoginSubmit}
                  className="d-flex flex-column gap-3"
                >
                  <input
                    type="email"
                    name="email"
                    className="form-control rounded-pill"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    className="form-control rounded-pill"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-primary rounded-pill w-100"
                  >
                    Login
                  </button>
                </form>
              </div>

              {/* Signup Form */}
              <div className="tab-pane fade" id="signup" role="tabpanel">
                <form
                  onSubmit={handleSignupSubmit}
                  className="d-flex flex-column gap-3"
                >
                  <input
                    type="text"
                    name="name"
                    className="form-control rounded-pill"
                    placeholder="username"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    className="form-control rounded-pill"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    className="form-control rounded-pill"
                    placeholder="Create Password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    required
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control rounded-pill"
                    placeholder="Confirm Password"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-success rounded-pill w-100"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
