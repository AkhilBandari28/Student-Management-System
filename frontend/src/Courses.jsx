import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Courses = () => {
  const id = localStorage.getItem("id");
  const [courses, setCourses] = useState([]);
  const [addedCourses, setAddedCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:8080/allcourses");
      const result = await res.json();
      setCourses(result.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchStudentCourses = async () => {
    try {
      const res = await fetch(`http://localhost:8080/findstudentcourses/${id}`);
      const result = await res.json();
      const enrolledCourseIds = result.data.map(course => course.cid);
      setAddedCourses(enrolledCourseIds);
    } catch (error) {
      console.error("Error fetching student courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    if (id) {
      fetchStudentCourses();
    }
  }, []);

  const addCourse = async (cid) => {
    if (!id) {
      toast.error("Please log in before adding a course.", {
        position: "top-right",
        className: "bg-red-600 text-white font-semibold text-sm rounded-md shadow-md",
        icon: "🚫",
      });
      return;
    }

    if (addedCourses.includes(cid)) {
      toast.info("This course has already been added.", {
        position: "top-right",
        className: "bg-yellow-500 text-white font-semibold text-sm rounded-md shadow-md",
        icon: "ℹ️",
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/addcourses/${id}/${cid}`, {
        method: "POST",
      });

      const result = await res.json();

      toast.success(result.msg || "Course added successfully!", {
        position: "top-right",
        className: "bg-green-600 text-white font-semibold text-sm rounded-md shadow-md",
        bodyClassName: "text-white",
        icon: "✅",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setAddedCourses(prev => [...prev, cid]);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-gray-900 to-white">
      {/* Toast Container */}
      <ToastContainer />

      {/* Navbar */}
      <div className="flex items-center justify-between px-8 py-5 bg-black text-indigo-400 shadow-lg">
        <NavLink to="/" className="text-3xl font-bold">StudentCourses</NavLink>
        <h1 className="text-2xl font-semibold">Available Courses</h1>
      </div>

      {/* Course Cards */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map(({ cid, name, cost, duration }) => (
          <div
            key={cid}
            className="bg-gradient-to-br from-blue-800 via-gray-900 to-white rounded-2xl shadow-md hover:shadow-2xl p-6 transition-shadow duration-300 flex flex-col justify-between"
          >
            <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
            <p className="text-gray-300 mb-1">Cost: ₹{cost}</p>
            <p className="text-gray-300 mb-4">Duration: {duration}</p>

            {addedCourses.includes(cid) ? (
              <button
                disabled
                className="mt-auto px-4 py-2 rounded-xl bg-gray-400 text-white cursor-not-allowed"
              >
                Already Added
              </button>
            ) : (
              <a
                href="#_"
                onClick={(e) => {
                  e.preventDefault();
                  addCourse(cid);
                }}
                className="relative px-6 py-3 font-bold text-white rounded-lg group mt-auto"
              >
                <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-gray-600 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
                <span className="relative">Add Course</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
