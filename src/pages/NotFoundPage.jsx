import React from "react";
import { motion } from "framer-motion";
import { FaBookDead } from "react-icons/fa";
import { Link } from "react-router";

const NotFoundPage = () => (
  
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-fuchsia-50 to-white px-4">
    <motion.div
      initial={{ y: -30, rotate: -10 }}
      animate={{
        y: [0, -18, 0],
        rotate: [-10, 7, -10],
      }}
      transition={{ duration: 1.4, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
      className="mb-7"
    >
      <FaBookDead className="text-fuchsia-500 drop-shadow-lg text-8xl" />
    </motion.div>
    <motion.h1
      className="text-5xl font-extrabold text-purple-800 mb-2 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      Oops! Page not found
    </motion.h1>
    <p className="text-lg text-fuchsia-600 mb-8 text-center max-w-md">
      Sorry, the page you’re looking for doesn’t exist or has been moved.
    </p>
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-yellow-400 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform text-lg"
      >
        Back to Home
      </Link>
    </motion.div>
  </div>
);

export default NotFoundPage;
