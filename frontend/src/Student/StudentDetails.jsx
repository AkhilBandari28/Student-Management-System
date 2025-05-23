import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentDetails = () => {
  const navigate = useNavigate();

  const lid = localStorage.getItem("id");
  const lfname = localStorage.getItem("fname");
  const llname = localStorage.getItem("lname");
  const lemail = localStorage.getItem("email");
  const lpassword = localStorage.getItem("password");
  const laddress = localStorage.getItem("address");
  const lmobileNumber = localStorage.getItem("mobileNumber");

  const [imageUrl, setImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const fetchImage = () => {
    fetch(`http://localhost:8080/getimage/${lid}`)
      .then((response) => response.blob())
      .then((blob) => {
        const imageObjectUrl = URL.createObjectURL(blob);
        setImageUrl(imageObjectUrl);
      })
      .catch((err) => console.error("Error fetching image:", err));
  };

  const uploadImage = () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    fetch(`http://localhost:8080/uploadimage/${lid}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.msg || "Image uploaded successfully");
        fetchImage();
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        alert("Image upload failed");
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:8080/deletestudent/${lid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        toast.error(result.msg || "Student deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          localStorage.clear();
          navigate("/");
        }, 3100);
      })
      .catch(() => {
        toast.error("Failed to delete student", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      {/* Toast Container with red background styling */}
      <ToastContainer
        toastClassName="!bg-red-600 !text-white !shadow-lg !rounded-lg"
        bodyClassName="text-sm font-medium"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-800">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            Student Profile
          </h2>

          {/* Profile Image */}
          <div className="flex flex-col items-center space-y-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover ring-4 ring-purple-500 shadow-lg"
              />
            ) : (
              <div className="w-36 h-36 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 text-sm">
                No Image
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="text-sm text-gray-300 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            />
            <button
              onClick={uploadImage}
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg transition duration-300 shadow"
            >
              Upload Image
            </button>
          </div>

          {/* Student Details Table */}
          <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-700">
            <table className="min-w-full">
              <tbody>
                {[
                  ["ID", lid],
                  ["First Name", lfname],
                  ["Last Name", llname],
                  ["Email", lemail],
                  ["Password", lpassword],
                  ["Address", laddress],
                  ["Mobile Number", lmobileNumber],
                ].map(([label, value], idx) => (
                  <tr
                    key={label}
                    className={idx % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
                  >
                    <th className="px-6 py-3 text-left font-medium text-purple-400 w-1/3">
                      {label}
                    </th>
                    <td className="px-6 py-3 text-white">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-6 pt-4">
            {/* Edit Button */}
            <a
              href="#_"
              onClick={() => navigate("/studentupdate")}
              className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-black bg-yellow-500 rounded-lg group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-yellow-600"></span>
              <span className="relative">Edit</span>
            </a>

            {/* Delete Button */}
            <a
              href="#_"
              onClick={handleDelete}
              className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <span className="relative">Delete</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
