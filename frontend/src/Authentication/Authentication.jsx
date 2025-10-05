
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

export default function AuthPage() {
  
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
              <LoginForm/>

              {/* Signup Form */}
              <SignupForm/>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
