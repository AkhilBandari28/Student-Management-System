import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDetails = () => {
  const navigate = useNavigate();

  const aid = localStorage.getItem("aid");
  const fname = localStorage.getItem("fname");
  const lname = localStorage.getItem("lname");
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const address = localStorage.getItem("address");
  const mobileNumber = localStorage.getItem("mobileNumber");

  const handleDelete = () => {
    fetch(`http://localhost:8080/deleteadmin/${aid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((result) => {
        toast.error(result.msg || "Admin deleted successfully", {
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
        toast.error("Failed to delete admin", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      {/* Toast Container for Admin */}
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
          <h2 className="text-4xl font-bold text-center text-white mb-4">Admin Profile</h2>

          {/* Admin Details Table */}
          <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-700">
            <table className="min-w-full">
              <tbody>
                {[
                  ["ID", aid],
                  ["First Name", fname],
                  ["Last Name", lname],
                  ["Email", email],
                  ["Password", password],
                  ["Address", address],
                  ["Mobile Number", mobileNumber],
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
              onClick={() => navigate("/adminupdate")}
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

export default AdminDetails;
