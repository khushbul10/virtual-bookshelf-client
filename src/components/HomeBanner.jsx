import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaStar, FaFireAlt, FaFeatherAlt } from "react-icons/fa";

const icons = [
  { Icon: FaBookOpen, color: "text-purple-400", rotate: -20, x: -80, y: 20 },
  { Icon: FaStar, color: "text-fuchsia-400", rotate: 20, x: 60, y: -40 },
  { Icon: FaFireAlt, color: "text-pink-500", rotate: -18, x: 110, y: 80 },
  { Icon: FaFeatherAlt, color: "text-yellow-400", rotate: 15, x: -110, y: -60 }
];

const HomeBanner = () => {
  return (
    <section className="bg-[url(https://www.transparenttextures.com/patterns/crissxcross.png)] rounded-3xl relative  overflow-hidden py-24 md:py-32 flex items-center justify-center min-h-[480px]">
      {/* FRESH Radial Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{ minHeight: 480 }}
        >
          <defs>
            <radialGradient id="bannerRadial" cx="60%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#f3e8ff" />
              <stop offset="35%" stopColor="#d8b4fe" />
              <stop offset="60%" stopColor="#a5b4fc" />
              <stop offset="85%" stopColor="#f9a8d4" />
              <stop offset="100%" stopColor="#fff" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bannerRadial)" />
        </svg>
      </div>

      {/* Decorative Floating Book Icons */}
      {icons.map(({ Icon, color, rotate, x, y }, i) => (
        <motion.div
          key={i}
          className={`absolute`}
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            zIndex: 2,
          }}
          initial={{
            opacity: 0.5,
            y: y + (i % 2 === 0 ? -40 : 40),
            x: x + (i % 2 === 0 ? 20 : -20),
            rotate: rotate - 10,
            scale: 0.7,
          }}
          animate={{
            opacity: [0.6, 0.95, 0.8, 0.6],
            y: [y, y + 15, y - 10, y],
            x: [x, x - 10, x + 6, x],
            rotate: [rotate, rotate + 12, rotate - 8, rotate],
            scale: [0.7, 1, 0.95, 0.7]
          }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon className={`${color} opacity-80 drop-shadow-xl text-6xl`} />
        </motion.div>
      ))}

      {/* Glassmorphic Glow Behind Content */}
      {/* <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[340px] rounded-3xl blur-2xl bg-gradient-to-br from-fuchsia-300/30 via-purple-400/10 to-white/30 pointer-events-none"
        initial={{ scale: 0.88, opacity: 0.62 }}
        animate={{ scale: [0.88, 1.05, 0.97, 1], opacity: [0.62, 0.9, 0.75, 0.62] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ zIndex: 1 }}
      /> */}

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center px-4"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 70 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-fuchsia-500 to-yellow-400 drop-shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Welcome to Your <span className="underline decoration-fuchsia-400 decoration-4">Virtual Bookshelf</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-purple-800 mb-8 font-semibold"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          Catalog. Review. Upvote. Track your reading journey with stunning visuals and community spirit!
        </motion.p>
        <motion.a
          href="/bookshelf"
          className="inline-block mt-4 px-8 py-3 text-xl font-bold rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-yellow-400 hover:from-purple-700 hover:to-fuchsia-500 text-white shadow-xl hover:scale-105 transition-transform"
          whileHover={{ scale: 1.09 }}
          // transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          Explore Books
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HomeBanner;
