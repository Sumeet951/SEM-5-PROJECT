import React, { use } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const handleLogout = () => {
    axios
      .get("http://localhost:3000/user/logout", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
        setUser(null);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="navbar bg-red-700 text-white shadow-sm flex flex-row justify-between flex-nowrap px-4">
      <div className="navbar-start text-left h-full">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost  text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-red-700"
          >
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/insights">Insights</Link>
            </li>
            <li>
              <Link to="/manage">Manage Subscriptions</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
          </ul>
        </div>
        <h3 className=" text-white text-xl no-underline">SubTrack</h3>
      </div>
      {user ? (
        <>
          <div className="navbar-center hidden mx-auto lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li className="hidden">
                <details>
                  <summary>Parent</summary>
                  <ul className="">
                    <li>
                      <Link to="">Submenu 1</Link>
                    </li>
                    <li>
                      <Link to="">Submenu 2</Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/insights">Insights</Link>
              </li>
              <li>
                <Link to="/manage">Manage Subscriptions</Link>
              </li>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
            </ul>
          </div>

          <div className="navbar-end h-full  mx-auto ">
            <Link to="" className="bg-white text-black btn mx-4">
              Add Subscription
            </Link>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="bg-neutral text-neutral-content w-8 rounded-full align-middle flex justify-center content-center">
                  <span className="text-md ">U</span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
              >
                <li className="hover:cursor-default hover:bg-black hover:text-white ">
                  Profile
                </li>
                <li
                  onClick={handleLogout}
                  role="button"
                  className="hover:cursor-default hover:bg-black hover:text-white "
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navbar;
