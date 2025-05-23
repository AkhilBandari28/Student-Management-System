import React, { useEffect, useState } from "react";

const ListOfCourses = () => {
  const [courses, setCourses] = useState([]);
  const [state, setState] = useState({
    name: "",
    duration: "",
    cost: "",
  });
  const [showForm, setShowForm] = useState(false);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8080/allcourses");
      const result = await response.json();
      setCourses(result.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedState = {
      name: state.name.trim(),
      duration: state.duration.trim(),
      cost: parseFloat(state.cost),
    };

    try {
      const response = await fetch("http://localhost:8080/savecourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([formattedState]),
      });

      if (response.ok) {
        alert("Course created successfully!");
        setState({ name: "", duration: "", cost: "" });
        setShowForm(false);
        fetchCourses();
      } else {
        const errorData = await response.json();
        console.error("Failed to create course:", errorData);
        alert("Failed to create course. Please check your input.");
      }
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  const deleteCourse = async (cid) => {
    try {
      const response = await fetch(`http://localhost:8080/deletecourse/${cid}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Course deleted successfully!");
        fetchCourses();
      } else {
        alert("Failed to delete course.");
      }
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        List of Courses
      </h1>

      <div className="flex flex-wrap gap-6 justify-center mb-12">
        {courses.map(({ cid, name, cost, duration }) => (
          <div
            key={cid}
            className="bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl p-6 rounded-2xl w-72 text-center border border-gray-700 transition-transform hover:scale-105"
          >
            <p className="text-xl font-semibold text-purple-400 mb-2">{name}</p>
            <p className="text-gray-300 mb-1">💸 Cost: ₹{cost}</p>
            <p className="text-gray-300 mb-4">⏳ Duration: {duration}</p>
            <button
              onClick={() => deleteCourse(cid)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-200"
            >
              Delete Course
            </button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold px-6 py-2 rounded shadow-md transition duration-300"
        >
          {showForm ? "Hide Form" : "Create Course"}
        </button>
      </div>

      {showForm && (
        <div className="mt-12 max-w-md mx-auto bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
            Create a New Course
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={(e) =>
                setState({ ...state, [e.target.name]: e.target.value })
              }
              placeholder="Course Name"
              className="w-full px-4 py-2 rounded bg-black text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <input
              type="text"
              name="duration"
              value={state.duration}
              onChange={(e) =>
                setState({ ...state, [e.target.name]: e.target.value })
              }
              placeholder="Duration"
              className="w-full px-4 py-2 rounded bg-black text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <input
              type="number"
              name="cost"
              value={state.cost}
              onChange={(e) =>
                setState({ ...state, [e.target.name]: e.target.value })
              }
              placeholder="Cost"
              step="0.01"
              className="w-full px-4 py-2 rounded bg-black text-white border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-2 rounded shadow-md transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ListOfCourses;
