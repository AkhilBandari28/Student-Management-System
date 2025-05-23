import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsBoxes } from "react-icons/bs";

const Navbar = () => {
  const navigate = useNavigate();

  const isAdminLoggedIn = !!localStorage.getItem("adminRole");
  const isStudentLoggedIn = !!localStorage.getItem("studentRole");

  const handleLogout = () => {
    localStorage.clear();

    toast.info("Logout Successful...", {
      position: "bottom-right",
      autoClose: 3000,
      theme: "colored",
      style: { backgroundColor: "orange", color: "#000" },
    });

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleProfile = () => {
    if (isAdminLoggedIn) {
      navigate("/admindetails");
    } else if (isStudentLoggedIn) {
      navigate("/studentdetails");
    } else {
      alert("Please Login...");
    }
  };

  return (
    <>
      <ToastContainer />
      <header className="bg-black text-indigo-400 shadow-md px-8 py-4">
        <nav className="flex justify-between items-center text-lg font-semibold">

          {/* Left side - Brand */}
          <div className="flex items-center gap-2">
            <BsBoxes size={28} />
            <span className="text-2xl font-bold tracking-wide font-serif">
              Learnova
            </span>
          </div>

          {/* Center - Links */}
          <div className="flex items-center gap-12">

            {/* Home */}
            <NavLink
              to="/"
              className="hover:text-yellow-400 transition duration-200 ease-in-out"
            >
              Home
            </NavLink>

            {/* Profile (Visible only if logged in) */}
            {(isAdminLoggedIn || isStudentLoggedIn) && (
              <button
                onClick={handleProfile}
                className="hover:text-yellow-400 transition duration-200 ease-in-out"
              >
                Profile
              </button>
            )}

            {/* Courses (Visible when no one or student is logged in) */}
            {!isAdminLoggedIn && (
              <NavLink
                to="/courses"
                className="hover:text-yellow-400 transition duration-200 ease-in-out"
              >
                Courses
              </NavLink>
            )}

            {/* List of Courses (Admin only) */}
            {isAdminLoggedIn && (
              <NavLink
                to="/listofcourses"
                className="hover:text-yellow-400 transition duration-200 ease-in-out"
              >
                ListOfCourses
              </NavLink>
            )}

            {/* My Courses (Student only) */}
            {isStudentLoggedIn && (
              <NavLink
                to="/mycourses"
                className="hover:text-yellow-400 transition duration-200 ease-in-out"
              >
                My Courses
              </NavLink>
            )}

            {/* Register (Hide for logged in users) */}
            {!isAdminLoggedIn && !isStudentLoggedIn && (
              <div className="relative group">
                <button className="hover:text-yellow-400 transition duration-200 ease-in-out">
                  Register
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-slate-800 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <NavLink to="/adminregister" className="block px-4 py-2 hover:bg-slate-700">
                    Admin Register
                  </NavLink>
                  <NavLink to="/studentregister" className="block px-4 py-2 hover:bg-slate-700">
                    Student Register
                  </NavLink>
                </div>
              </div>
            )}

            {/* Login / Logout */}
            {!isAdminLoggedIn && !isStudentLoggedIn ? (
              <div className="relative group">
                <button className="hover:text-yellow-400 transition duration-200 ease-in-out">
                  Login
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-slate-800 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <NavLink to="/adminlogin" className="block px-4 py-2 hover:bg-slate-700">
                    Admin Login
                  </NavLink>
                  <NavLink to="/studentlogin" className="block px-4 py-2 hover:bg-slate-700">
                    Student Login
                  </NavLink>
                </div>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="hover:text-yellow-400 transition duration-200 ease-in-out"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

