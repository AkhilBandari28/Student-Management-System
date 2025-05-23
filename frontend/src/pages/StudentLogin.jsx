import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    })
      .then((response) => response.json())
      .then((result) => {
        if (result && result.data && result.data.id) {
          localStorage.clear();
          localStorage.setItem("studentRole", "true");
          localStorage.setItem("id", result.data.id);
          localStorage.setItem("fname", result.data.fname);
          localStorage.setItem("lname", result.data.lname);
          localStorage.setItem("email", result.data.email);
          localStorage.setItem("password", result.data.password);
          localStorage.setItem("address", result.data.address);
          localStorage.setItem("mobileNumber", result.data.mobileNumber);

          toast.success(result.msg || "Login successful!", {
            position: "top-right",
            autoClose: 3000,
          });

          setTimeout(() => {
            setState({ email: "", password: "" });
            navigate("/");
          }, 1500);
        } else {
          toast.error(result.msg || "Login failed. Please check credentials.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error("Server error. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-6 font-sans text-[max(3.333vmin,16px)] antialiased bg-gradient-to-tr from-indigo-200 via-purple-100 to-purple-300 overflow-hidden">
      <ToastContainer />
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-indigo-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Student Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={state.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={state.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white text-xl font-semibold py-3 rounded-full bg-gray-600 shadow-md hover:bg-purple-700 hover:shadow-[0_0_25px_rgba(97,56,216,0.5)] transition-all duration-500 ease-out transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={() => navigate("/")}
            className="w-full text-[#6138D8] text-lg font-semibold py-2 rounded-full border border-[#6138D8] bg-white hover:bg-[#6138D8] hover:text-white shadow transition-all duration-500 ease-out transform hover:scale-[1.02]"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;





