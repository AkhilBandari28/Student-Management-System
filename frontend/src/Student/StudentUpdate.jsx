import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentUpdate = () => {
  const navigate = useNavigate();
  const lid = localStorage.getItem("id");

  const [formData, setFormData] = useState({
    id: lid,
    fname: localStorage.getItem("fname") || "",
    lname: localStorage.getItem("lname") || "",
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
    address: localStorage.getItem("address") || "",
    mobileNumber: localStorage.getItem("mobileNumber") || "",
  });

  const [imageUrl, setImageUrl] = useState(localStorage.getItem("img") || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadImage = async () => {
    if (!selectedImage) return true;

    const formDataToSend = new FormData();
    formDataToSend.append("file", selectedImage);

    try {
      const res = await fetch(`http://localhost:8080/uploadimage/${lid}`, {
        method: "POST",
        body: formDataToSend,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.msg || "Image upload failed");

      if (result.image) {
        localStorage.setItem("img", result.image);
        setImageUrl(result.image);
      }

      setSelectedImage(null);
      return true;
    } catch (err) {
      toast.error("Image upload failed: " + err.message, {
        position: "top-right",
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUploadSuccess = await uploadImage();
      if (!imageUploadSuccess) return;

      const updateData = {
        id: lid,
        ...formData,
      };

      const response = await fetch(`http://localhost:8080/updatestudent`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error("Update failed");

      // Save updated data to localStorage
      for (const key in formData) {
        localStorage.setItem(key, formData[key]);
      }

      toast.success("Student updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        style: { backgroundColor: "yellow", color: "black" },
      });

      setTimeout(() => {
        navigate("/studentdetails");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-950 to-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-slate-800 to-slate-600 p-8 rounded-2xl shadow-2xl w-full max-w-xl space-y-6 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Update Student Details
        </h2>

        <div className="flex flex-col items-center space-y-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-400 shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-400 flex items-center justify-center text-gray-700 text-sm">
              No Image
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-300 file:text-indigo-900 hover:file:bg-indigo-400"
          />
        </div>

        <input
          type="text"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          className="w-full bg-slate-700 border border-gray-500 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="First Name"
          required
        />

        <input
          type="text"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
          className="w-full bg-slate-700 border border-gray-500 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Last Name"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-slate-700 border border-gray-500 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Email"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-slate-700 border border-gray-500 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Password"
          required
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full bg-slate-700 border border-gray-500 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Address"
          required
        />

        <input
          type="number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          className="w-full bg-slate-700 border border-gray-500 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Mobile Number"
          required
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full max-w-xs bg-indigo-400 hover:bg-indigo-500 text-black font-semibold py-3 rounded-md text-lg transition duration-300"
          >
            Update
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default StudentUpdate;
