import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const iconVariants = {
  hover: { scale: 1.25, color: "#C026D3", rotate: 8, transition: { type: "spring", stiffness: 300 } },
  rest: { scale: 1, color: "#fff" },
};

const Footer = () => {
  return (
    <footer className="relative mt-20 z-20 bg-[#1b103a]">
      {/* Glassy Gradient BG */}
      {/* <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/80 via-fuchsia-700/70 to-pink-700/60 blur-lg opacity-70 pointer-events-none" /> */}
      <div className="relative max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center md:items-start justify-between z-10">
        {/* Logo & Name */}
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl drop-shadow-lg"> <img src="/download.png" className="w-10 h-10" alt="" /> </span>
            <span className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg tracking-wider">
              Virtual Bookshelf
            </span>
          </div>
          <span className="text-purple-100/90 text-sm italic">Your gateway to a world of stories</span>
        </div>
        {/* Contact & Links */}
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 gap-2">
          <a
            href="mailto:yourmail@example.com"
            className="text-fuchsia-100/90 hover:text-white font-medium transition"
          >
            📧 contract@virtualbookdhelf.com
          </a>
          <a
            href="/terms"
            className="text-fuchsia-200 hover:underline transition"
          >
            Terms & Conditions
          </a>
        </div>
        {/* Social Icons */}
        <div className="flex gap-6">
          <motion.a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariants}
            initial="rest"
            whileHover="hover"
            whileTap="hover"
            className="text-white text-2xl bg-white/10 p-2 rounded-full shadow-lg transition-all hover:bg-white/20"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariants}
            initial="rest"
            whileHover="hover"
            whileTap="hover"
            className="text-white text-2xl bg-white/10 p-2 rounded-full shadow-lg transition-all hover:bg-white/20"
            aria-label="Twitter"
          >
            <FaTwitter />
          </motion.a>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariants}
            initial="rest"
            whileHover="hover"
            whileTap="hover"
            className="text-white text-2xl bg-white/10 p-2 rounded-full shadow-lg transition-all hover:bg-white/20"
            aria-label="Instagram"
          >
            <FaInstagram />
          </motion.a>
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariants}
            initial="rest"
            whileHover="hover"
            whileTap="hover"
            className="text-white text-2xl bg-white/10 p-2 rounded-full shadow-lg transition-all hover:bg-white/20"
            aria-label="Github"
          >
            <FaGithub />
          </motion.a>
        </div>
      </div>
      <div className="text-center border-t-2 border-purple-800/30 py-4 text-xs text-purple-100/80 z-10 relative bg-[#1b103a]">
        &copy; {new Date().getFullYear()} Virtual Bookshelf &mdash; All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
