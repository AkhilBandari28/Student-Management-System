import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyCourses = () => {
  const id = localStorage.getItem("id");
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("studentRole");
    if (!role) {
      alert("You must be logged in as a student to view this page.");
      navigate("/");
    }
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`http://localhost:8080/findstudentcourses/${id}`);
      const result = await res.json();
      setCourses(result.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (cid) => {
    try {
      const res = await fetch(`http://localhost:8080/removecourse/${id}/${cid}`, {
        method: "POST",
      });
      const result = await res.json();
      setCourses(courses.filter(course => course.cid !== cid));
      
      toast(result.msg || "Course removed successfully", {
        position: "top-right",
        className: "bg-red-900 text-white font-bold text-sm",
        progressClassName: "bg-white",
        icon: "🗑️",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <ToastContainer />

      {/* Navbar */}
      <div className='flex justify-between items-center px-8 py-5 bg-gradient-to-r from-purple-900 via-black to-purple-900 shadow-lg'>
        <NavLink to="/" className="text-3xl font-bold text-white hover:text-purple-300 transition">
          StudentCourses
        </NavLink>
        <h1 className="text-2xl font-semibold text-purple-300">My Courses</h1>
      </div>

      {/* Course List */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.length === 0 ? (
          <p className="text-gray-300 col-span-full text-center text-lg">
            No courses enrolled yet.
          </p>
        ) : (
          courses.map(({ cid, name, cost, duration }) => (
            <div
              key={cid}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-xl hover:shadow-2xl p-6 transition-all duration-300 flex flex-col justify-between border border-gray-700"
            >
              <h2 className="text-xl font-bold text-purple-400 mb-2">{name}</h2>
              <p className="text-gray-300 mb-1">Cost: ₹{cost}</p>
              <p className="text-gray-300 mb-4">Duration: {duration} months</p>
              <button
                onClick={() => deleteCourse(cid)}
                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded-xl hover:bg-white group mt-auto"
              >
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-red-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                  Remove Course
                </span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCourses;
