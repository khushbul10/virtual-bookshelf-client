import React from "react";
import { motion } from "framer-motion";

const LoadingPage = ({
  message = "Loading...",
  fullScreen = true,
  className = "",
}) => (
  <div
    className={`flex flex-col items-center justify-center ${
      fullScreen ? "min-h-screen" : "min-h-[180px]"
    } bg-gradient-to-br from-fuchsia-50 via-white to-purple-50 ${className}`}
  >
    <motion.div
      className="relative"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1.2,
        ease: "linear",
      }}
    >
      {/* Glowing animated ring */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-fuchsia-400 via-purple-400 to-yellow-300 blur-lg opacity-70"></span>
      {/* Spinner core */}
      <motion.div
        className="w-16 h-16 border-[6px] border-fuchsia-300 border-t-purple-600 border-b-yellow-400 border-l-white border-r-fuchsia-400 rounded-full"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 0.9,
          ease: "linear",
        }}
      />
      {/* Center icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-purple-500 font-bold">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 6v6l4 2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    </motion.div>
    <div className="mt-7 text-xl font-semibold text-fuchsia-600 animate-pulse">
      {message}
    </div>
  </div>
);

export default LoadingPage;
