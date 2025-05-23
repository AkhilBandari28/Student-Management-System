import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import p0 from "./assets/p0.jpg";
import p1 from "./assets/p1.jpg";
import p2 from "./assets/p2.jpg";
import p3 from "./assets/p3.jpg";
import p4 from "./assets/p4.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const Home = () => {
  // Scroll to Navbar on Get Started button click
  const scrollToNavbar = () => {
    const navbarElement = document.querySelector("nav"); // assuming Navbar renders a <nav> element
    if (navbarElement) {
      navbarElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-black text-white"
    >
      <Navbar />

      {/* Hero Section - Fullscreen */}
      <div
        className="bg-cover bg-center h-[100vh] flex flex-col items-center justify-center text-center px-6"
        style={{ backgroundImage: `url(${p0})` }}
      >
        <motion.h1
          className="text-5xl font-bold mb-4 text-indigo-400"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={0}
        >
          Welcome to the Student Management System
        </motion.h1>
        <motion.p
          className="text-lg max-w-xl mx-auto text-gray-300"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={1}
        >
          Academic Management System for Student and Course Control.
        </motion.p>
      </div>

      {/* Section 1 - Image Right */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-10 px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="md:w-1/2" variants={fadeInUp} custom={1}>
          <h2 className="text-3xl font-semibold mb-3 ml-20 text-indigo-400">
            Track Academic Performance
          </h2>
          <p className="text-gray-300 ml-20">
          Gain valuable insights into each student’s academic journey.
          Track learning milestones with intuitive visual analytics.
          Monitor progress through detailed charts and data summaries.
          Empower smarter decisions with real-time performance tracking.
          </p>
        </motion.div>
        <motion.img
          src={p1}
          alt="p1"
          className="md:w-[400px] h-[400px] rounded-xl ml-50 shadow-xl object-cover"
          variants={fadeInUp}
          custom={2}
        />
      </motion.div>

      {/* Section 2 - Image Left */}
      <motion.div
        className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="md:w-1/2" variants={fadeInUp} custom={1}>
          <h2 className="text-3xl font-semibold mb-3 mr-20 text-indigo-400">
            Efficient Course Management
          </h2>
          <p className="text-gray-300 mr-20">
          Assign, update, and manage courses effortlessly with a user-friendly interface.
          Organize students into batches for better academic structuring.
          Simplify course scheduling and enrollment processes.
          Streamline academic planning with intuitive tools and controls.
          </p>
        </motion.div>
        <motion.img
          src={p2}
          alt="p2"
          className="md:w-[400px] h-[400px] rounded-xl mr-50 shadow-xl object-cover"
          variants={fadeInUp}
          custom={2}
        />
      </motion.div>

      {/* Section 3 - Image Right */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-10 px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="md:w-1/2" variants={fadeInUp} custom={1}>
          <h2 className="text-3xl font-semibold mb-3 ml-20 text-indigo-400">
            Real-Time Notifications
          </h2>
          <p className="text-gray-300 ml-20">
          Send important updates and academic alerts instantly to students and faculty.
          Keep everyone informed with real-time notifications.
          Enhance communication for better transparency across the institution.
          </p>
        </motion.div>
        <motion.img
          src={p3}
          alt="p3"
          className="md:w-[400px] h-[400px] rounded-xl ml-50 shadow-xl object-cover"
          variants={fadeInUp}
          custom={2}
        />
      </motion.div>

      {/* Section 4 - Image Left */}
      <motion.div
        className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="md:w-1/2" variants={fadeInUp} custom={1}>
          <h2 className="text-3xl font-semibold mb-3 mr-20 text-indigo-400">
            Automated Billing System
          </h2>
          <p className="text-gray-300 mr-20">
          Manage fee structures efficiently with a user-friendly system.
          Generate accurate bills for students and guardians seamlessly.
          Track payments in real-time to maintain complete financial transparency.
          </p>
        </motion.div>
        <motion.img
          src={p4}
          alt="p4"
          className="md:w-[400px] h-[400px] rounded-xl mr-50 shadow-xl object-cover"
          variants={fadeInUp}
          custom={2}
        />
      </motion.div>

      {/* New Cards Section with Hover Effect and Feedback Title */}
      <motion.div
        className="flex flex-col items-center px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={1}
      >
        {/* Feedback Heading */}
        <h2 className="text-4xl font-bold mb-12 text-indigo-400">Feedback</h2>

        {/* Cards Container with space-around */}
        <div
          className="container flex"
          style={{
            maxWidth: "1200px",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <div className="card">
            <div className="face face1">
              <div className="content">
                <h2>Dr. Meera Srinivasan – College Dean</h2>
                <p>
                  “The Student Management System is an excellent tool for
                  academic institutions. The ability to manage student records,
                  update profiles, and handle login authentications in such a
                  structured way is commendable. The system is intuitive and
                  aligns well with our administrative needs.”
                </p>
              </div>
            </div>
            <div className="face face2">
              <h2>01</h2>
            </div>
          </div>
          <div className="card">
            <div className="face face1">
              <div className="content">
                <h2>Rahul Sharma – Final Year Student</h2>
                <p>
                  “This project makes managing my student information so simple.
                  I can easily view and update my details, and the interface is
                  clean and user-friendly. I especially like how secure the
                  login and session management are. Feels like a real college
                  portal!”
                </p>
              </div>
            </div>
            <div className="face face2">
              <h2>02</h2>
            </div>
          </div>
          <div className="card">
            <div className="face face1">
              <div className="content">
                <h2>Priya Nair – Software Developer & Academic Mentor</h2>
                <p>
                  “Great job implementing a real-world project using Java
                  Servlets and MySQL. The code structure is neat, with
                  well-managed session handling and form validations. Features
                  like edit/delete with session-based updates show practical
                  thinking. A very professional approach!”
                </p>
              </div>
            </div>
            <div className="face face2">
              <h2>03</h2>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className="text-center px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={1}
      >
        <motion.button
          onClick={scrollToNavbar}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow hover:bg-indigo-500 transition"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Footer */}
      <footer className="text-center mt-20 pb-6 opacity-60 text-sm text-gray-400">
        © 2025 Student Management System. All rights reserved.
      </footer>

      {/* Embedded CSS for card hover effects */}
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #000;
          color: #fff;
        }
        .container {
          display: flex;
          justify-content: space-around;
          flex-wrap: nowrap;
          gap: 2rem;
          width: 100%;
          max-width: 1200px;
        }
        .card {
          position: relative;
          width: 350px;
          height: 350px;
          cursor: pointer;
          perspective: 1000px;
          border-radius: 20px;
          overflow: hidden;
          background: #111;
          box-shadow: 0 15px 35px rgba(0,0,0,0.5);
          transition: transform 0.4s ease;
        }
        .card:hover {
          transform: translateY(-20px);
          box-shadow: 0 25px 45px rgba(0,0,0,0.7);
        }
        .face {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.5s ease-in-out;
          backface-visibility: hidden;
        }
        .face1 {
          top: 0;
          left: 0;
          background: linear-gradient(45deg, #1a1a1a, #0d0d0d);
          padding: 30px;
          opacity: 0;
          pointer-events: none;
          flex-direction: column;
          text-align: center;
          color: #e0e0e0;
          font-size: 1rem;
          transition: opacity 0.4s ease, transform 0.4s ease;
          transform: translateY(20px);
        }
        .card:hover .face1 {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
          z-index: 10;
        }
        .face2 {
          background: #272727;
          color: #888;
          font-size: 5rem;
          font-weight: 900;
          user-select: none;
          transition: color 0.4s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .face2:hover {
          color: #b72fff;
        }
        .face1 .content h2 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #b72fff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .face1 .content p {
          font-size: 1rem;
          line-height: 1.5;
          color: #ccc;
        }
      `}</style>
    </motion.div>
  );
};

export default Home;
