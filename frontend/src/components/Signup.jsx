import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  const navigate= useNavigate();
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  let {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
    
  const onSubmit = (data) => {
    axios.post("http://localhost:3000/user/register", {
      username: data.username,
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      console.log(res.data);
      navigate('/');
    })
    .catch((err) => {
      
        setError("root", {type:"manual", message: 'User already exists'});
      
    });
  }
  return (
    <>
      <h1 className="text-red-700 font-bold text-3xl text-center my-10">
        Sign Up
      </h1>
      <form
        className="flex flex-col items-center mt-20 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="username"
          value={username}
          {...register("username", { required: "Username is required" })}
          className="input input-bordered max-w-sm mb-4"
          onChange={handleUsernameChange}
        />
        {errors.username && (<p className="text-red-500">{errors.username.message}</p>)}
        <input
          type="email"
          placeholder="Email"
          value={email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="input input-bordered max-w-sm mb-4"
          onChange={handleEmailChange}
        />
        {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}
        <input
          type="password"
          placeholder="Password"
          value={password}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
          className="input input-bordered max-w-sm mb-4"
          onChange={handlePasswordChange}
        />
        {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
            {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",  
            })}
          className="input input-bordered max-w-sm mb-4"
          onChange={handleConfirmPasswordChange}
        />
        {errors.confirmPassword && (<p className="text-red-500">{errors.confirmPassword.message}</p>)}
        <button className="btn text-white bg-red-700 max-w-sm " disabled={isSubmitting}>
            {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
        {errors.root && (<p className="text-red-500">{errors.root.message}</p>)}
        <Link
          to="/login"
          className="text-blue-800 hover:text-blue-700 text-center mt-4"
        >
          Already have an account? Log in here.
        </Link>
      </form>
    </>
  );
}

export default Signup;
