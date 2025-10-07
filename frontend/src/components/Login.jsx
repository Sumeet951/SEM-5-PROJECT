import { use, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let {user,setUser}=useContext(UserContext);
  let navigate=useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/user/login", {
        email,
        password,
      }, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setUser({email});
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1 className="text-red-700 font-bold text-3xl text-center my-10">
        Log In
      </h1>
      <form
        className="max-w-sm mx-auto mt-20 space-y-4"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          className="input input-bordered w-full"
          onChange={handleEmailChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          className="input input-bordered w-full"
          onChange={handlePasswordChange}
        />

        <button className="btn text-white bg-red-700 w-full">Submit</button>
        <Link to="/signup" className="text-blue-800 hover:text-blue-700 text-center">New here ? Sign up now.</Link>
      </form>
      
    </>
  );
}

export default Login;
