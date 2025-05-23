import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentRegister = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    address: "",
    mobileNumber: ""
  });

  const [passwordError, setPasswordError] = useState("");

  const upper = /[A-Z]/;
  const lower = /[a-z]/;
  const special = /[!@#$%&? "]/;
  const number = /(?=.*\d)/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });

    if (name === "password") {
      let error = "";
      if (value.length < 8) error += "Minimum 8 characters. ";
      if (!upper.test(value)) error += "Must include uppercase. ";
      if (!lower.test(value)) error += "Must include lowercase. ";
      if (!special.test(value)) error += "Must include special char. ";
      if (!number.test(value)) error += "Must include a number. ";
      setPasswordError(error.trim());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);

    fetch("http://localhost:8080/savestudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    })
      .then((response) => response.json())
      .then((result) => {
        toast.success(result.msg, {
          position: "top-right",
          theme: "colored",
          style: { backgroundColor: '#2563eb' } // blue
        });
        setState({
          fname: "",
          lname: "",
          email: "",
          password: "",
          address: "",
          mobileNumber: ""
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Registration failed");
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <ToastContainer />

      <div className="bg-[#111] shadow-2xl rounded-2xl px-10 pt-8 pb-10 w-[95%] max-w-lg border border-gray-800">
        <h2 className="text-4xl font-bold mb-6 text-white text-center">
          Student Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="fname"
            value={state.fname}
            onChange={handleChange}
            className="w-full border border-gray-700 bg-[#1a1a1a] text-white rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="First Name"
            required
          />

          <input
            type="text"
            name="lname"
            value={state.lname}
            onChange={handleChange}
            className="w-full border border-gray-700 bg-[#1a1a1a] text-white rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Last Name"
            required
          />

          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            className="w-full border border-gray-700 bg-[#1a1a1a] text-white rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Email"
            required
          />

          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            className="w-full border border-gray-700 bg-[#1a1a1a] text-white rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Password"
            required
          />

          {passwordError && (
            <p className="text-red-400 text-sm">{passwordError}</p>
          )}

          <input
            type="text"
            name="address"
            value={state.address}
            onChange={handleChange}
            className="w-full border border-gray-700 bg-[#1a1a1a] text-white rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Address"
          />

          <input
            type="number"
            name="mobileNumber"
            value={state.mobileNumber}
            onChange={handleChange}
            className="w-full border border-gray-700 bg-[#1a1a1a] text-white rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Mobile Number"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-full py-3 text-lg font-semibold 
            shadow-md hover:bg-purple-700 hover:shadow-[0_0_25px_rgba(97,56,216,0.5)] transition-all duration-500 ease-out transform hover:scale-[1.02]"
          >
            Register
          </button>
        </form>

        <p className="text-white text-center mt-6 text-sm">
          Already registered? Please login to access your student portal.
        </p>

        <div className="flex gap-4 justify-center mt-5">
          <button
            onClick={() => navigate("/studentlogin")}
            className="bg-green-600 text-white rounded-full px-6 py-2 text-base font-medium 
            shadow-md hover:bg-purple-700 hover:shadow-[0_0_25px_rgba(97,56,216,0.5)] transition-all duration-500 ease-out transform hover:scale-[1.02]"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-white text-[#6138D8] rounded-full px-6 py-2 text-base font-medium border border-[#6138D8] 
            hover:bg-[#6138D8] hover:text-white shadow transition-all duration-500 ease-out transform hover:scale-[1.02]"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
