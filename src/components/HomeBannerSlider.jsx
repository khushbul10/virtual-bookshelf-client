import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaUsers,
  FaChartLine,
  FaFeatherAlt,
  FaStar,
} from "react-icons/fa";

// Slides data
const slides = [
  {
    title: "Your Reading, Reimagined",
    desc: "Create a digital shelf, organize every story, and keep your book world in one magical place.",
    icon: <FaBookOpen className="text-6xl md:text-7xl text-white drop-shadow-xl" />,
    bg: "from-purple-700/80 via-fuchsia-500/80 to-pink-400/80",
    overlay: "bg-gradient-to-tr from-fuchsia-100/30 via-white/40 to-transparent",
  },
  {
    title: "Community Power",
    desc: "Share thoughts, read trusted reviews, and upvote your next favorite read. The bookshelf is social again.",
    icon: <FaUsers className="text-6xl md:text-7xl text-fuchsia-100 drop-shadow-xl" />,
    bg: "from-fuchsia-500/80 via-pink-400/80 to-purple-700/80",
    overlay: "bg-gradient-to-br from-purple-50/50 to-white/20",
  },
  {
    title: "Track Your Progress",
    desc: "Visualize your journey and celebrate milestones. Reading should feel as rewarding as finishing a great book!",
    icon: <FaChartLine className="text-6xl md:text-7xl text-yellow-100 drop-shadow-xl" />,
    bg: "from-purple-800/90 via-blue-400/90 to-pink-400/90",
    overlay: "bg-gradient-to-tl from-blue-100/20 via-white/10 to-fuchsia-100/30",
  },
];

// Parallax/floating blobs
const decoBlobs = [
  { className: "absolute -top-20 -left-20 w-52 h-52 rounded-full blur-3xl", color: "bg-fuchsia-200/50", delay: 0 },
  { className: "absolute top-1/2 right-0 w-60 h-60 rounded-full blur-3xl", color: "bg-purple-200/50", delay: 2.5 },
  { className: "absolute bottom-0 left-1/3 w-72 h-72 rounded-full blur-3xl", color: "bg-pink-100/40", delay: 4 },
];

// react-slick settings
const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  speed: 700,
  autoplaySpeed: 5500,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
  appendDots: (dots) => (
    <div className="relative mt-4">
      <ul className="flex gap-3 justify-center">{dots}</ul>
    </div>
  ),
  customPaging: (i) => (
    <div className="w-4 h-4 bg-white/80 border-2 border-fuchsia-500 rounded-full opacity-70 hover:opacity-100 transition" />
  ),
};

const HomeBannerSlider = () => (
  <section className="relative overflow-hidden mt-10 min-h-[380px] md:min-h-[430px] flex items-center justify-center select-none">
    {/* Floating blobs */}
    {decoBlobs.map((blob, i) => (
      <motion.div
        key={i}
        className={blob.className + " " + blob.color}
        initial={{ scale: 0.85 + i * 0.1, opacity: 0.7 }}
        animate={{
          scale: [0.85 + i * 0.1, 1.08 + i * 0.09, 0.85 + i * 0.1],
          opacity: [0.7, 0.5, 0.7],
        }}
        transition={{
          duration: 11 - i * 2,
          repeat: Infinity,
          delay: blob.delay,
          ease: "easeInOut",
        }}
        style={{ zIndex: 0 }}
      />
    ))}

    <div className="w-full max-w-4xl mx-auto relative z-10">
      <Slider  {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx} className="overflow-hidden p-4 rounded-3xl">
            <motion.div
              className={`
                relative flex flex-col items-center justify-center h-[380px] md:h-[430px] px-5 md:px-14 text-center overflow-hidden
                bg-gradient-to-br ${slide.bg} rounded-3xl
              `}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15 }}
            >
              {/* Glassy overlay */}
              {/* <div
                className={`absolute inset-0 z-0 ${slide.overlay}`}
                style={{ backdropFilter: "blur(8px)" }}
              /> */}
              {/* Animated confetti icons */}
              <motion.div
                className="absolute left-8 top-7 md:left-20 md:top-16 z-20"
                initial={{ scale: 0.6, rotate: -30, opacity: 0.7 }}
                animate={{
                  scale: [0.6, 1, 0.7],
                  rotate: [-30, -10, 10, -30],
                  opacity: [0.7, 1, 0.85, 0.7]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: idx * 1.5,
                  ease: "linear"
                }}
              >
                <FaFeatherAlt className="text-yellow-200 text-5xl drop-shadow" />
              </motion.div>
              <motion.div
                className="absolute right-8 bottom-8 md:right-20 md:bottom-20 z-20"
                initial={{ scale: 0.6, rotate: 22, opacity: 0.8 }}
                animate={{
                  scale: [0.7, 1.13, 0.7],
                  rotate: [22, 16, -8, 22],
                  opacity: [0.8, 1, 0.9, 0.8]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  delay: idx,
                  ease: "linear"
                }}
              >
                <FaStar className="text-pink-100 text-5xl drop-shadow" />
              </motion.div>
              {/* Main Icon */}
              <motion.div
                className="z-30 mb-4"
                initial={{ y: -60, scale: 0.6, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{ delay: 0.22 }}
              >
                {slide.icon}
              </motion.div>
              <motion.h2
                className="text-white text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-lg"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <span className="relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-fuchsia-400 after:to-purple-400 after:opacity-50 after:-z-10">
                  {slide.title}
                </span>
              </motion.h2>
              <motion.p
                className="text-white/90 text-lg md:text-xl mb-3 font-medium max-w-xl mx-auto drop-shadow"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.49 }}
              >
                {slide.desc}
              </motion.p>
              {/* Button */}
              <motion.a
                href="/bookshelf"
                className="mt-4 px-7 py-2.5 text-lg font-bold rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-yellow-400 hover:from-purple-700 hover:to-fuchsia-500 text-white shadow-xl hover:scale-105 transition-transform"
                whileHover={{ scale: 1.07 }}
                transition={{ type: "spring", stiffness: 350, damping: 16 }}
              >
                Get Started
              </motion.a>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  </section>
);

export default HomeBannerSlider;
