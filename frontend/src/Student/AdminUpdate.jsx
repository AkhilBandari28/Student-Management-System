import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUpdate = () => {
  const navigate = useNavigate();
  const aid = localStorage.getItem("aid");

  const [formData, setFormData] = useState({
    aid: aid,
    fname: localStorage.getItem("fname") || "",
    lname: localStorage.getItem("lname") || "",
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
    address: localStorage.getItem("address") || "",
    mobileNumber: localStorage.getItem("mobileNumber") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/updateadmin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");

      // Save updated data to localStorage
      for (const key in formData) {
        localStorage.setItem(key, formData[key]);
      }

      toast.success("Admin updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        style: { backgroundColor: "yellow", color: "black" },
      });

      setTimeout(() => {
        navigate("/admindetails");
      }, 3500);
    } catch (error) {
      toast.error(error.message || "Update failed", {
        position: "top-right",
        autoClose: 3000,
        style: { backgroundColor: "yellow", color: "black" },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-800 to-gray-600 p-8 rounded-xl shadow-2xl w-full max-w-md space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Update Admin Details
        </h2>

        <input
          type="text"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white border border-gray-500 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="First Name"
        />

        <input
          type="text"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white border border-gray-500 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Last Name"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white border border-gray-500 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white border border-gray-500 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Password"
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white border border-gray-500 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Address"
        />

        <input
          type="number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white border border-gray-500 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Mobile Number"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-md text-lg transition duration-300"
        >
          Update
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AdminUpdate;



