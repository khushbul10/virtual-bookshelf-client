import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaThumbsUp } from "react-icons/fa";
import LoadingPage from "../pages/LoadingPage";

// Subtle floating circle background
const BgDecor = () => (
  <>
    <motion.div
      className="hidden md:block absolute left-0 top-14 w-52 h-52 rounded-full bg-fuchsia-200/30 blur-2xl"
      initial={{ scale: 0.8, opacity: 0.7 }}
      animate={{ scale: [0.8, 1, 0.8], opacity: [0.7, 0.55, 0.7] }}
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      style={{ zIndex: 0 }}
    />
    <motion.div
      className="hidden md:block absolute right-0 bottom-0 w-60 h-60 rounded-full bg-purple-300/30 blur-2xl"
      initial={{ scale: 1.2, opacity: 0.5 }}
      animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.7, 0.5] }}
      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      style={{ zIndex: 0 }}
    />
  </>
);

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: i => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, type: "spring", stiffness: 60 },
  }),
};

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/books/popular`)
      .then((res) => setBooks(res.data || []))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading && books.length === 0) {
    return (
      <LoadingPage></LoadingPage>
    );
  }

  return (
    <section className="relative my-20">
      <BgDecor />
      <div className="relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl py-4 md:text-5xl font-black tracking-tight text-purple-800 inline-block relative">
            Popular Books
            <motion.span
              layoutId="underline"
              className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4/5 h-1 rounded-full bg-gradient-to-r from-fuchsia-400 to-purple-400 opacity-50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 30, delay: 0.4 }}
            />
          </h2>
          <p className="mt-3 text-fuchsia-800 text-lg">Our community's top picks — discover your next read!</p>
        </div>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500"></div>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.12 } }
              }}
            >
              {books.map((book, idx) => (
                <motion.div
                  key={book._id || idx}
                  custom={idx}
                  variants={cardVariants}
                  exit={{ opacity: 0, y: 40, scale: 0.97 }}
                  className={`
                    relative bg-white/70 backdrop-blur-lg
                    border border-purple-100 shadow-2xl rounded-3xl
                    transition-transform duration-300 flex flex-col group
                    overflow-hidden hover:-translate-y-2
                  `}
                  style={{ zIndex: 2 }}
                >
                  <motion.div
                    className="absolute top-5 right-5 z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.1, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.8, delay: 0.3 + idx * 0.04 }}
                  >
                    <span className="flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-fuchsia-500 to-purple-400 text-white font-bold rounded-full text-sm shadow">
                      <FaThumbsUp className="animate-pulse" /> {book.upvote ?? 0}
                    </span>
                  </motion.div>
                  <div className="flex flex-col items-center pt-9 pb-5 px-6">
                    <motion.div
                      className="mb-4 w-32 h-44 rounded-xl shadow-xl border-4 border-purple-100 overflow-hidden"
                      whileHover={{ scale: 1.09, rotate: -2 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <img
                        src={book.cover_photo}
                        alt={book.book_title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold text-purple-900 mb-0.5 text-center">
                      {book.book_title}
                    </h3>
                    <div className="text-xs text-fuchsia-700 mb-2 text-center font-semibold">
                      by {book.book_author}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center mb-2">
                      <span className="px-2 py-1 text-xs rounded bg-fuchsia-100/60 text-fuchsia-700 font-semibold">
                        {book.book_category}
                      </span>
                      <span className="px-2 py-1 text-xs rounded bg-purple-100/60 text-purple-700 font-semibold">
                        {book.reading_status}
                      </span>
                    </div>
                    <button
                      className="mt-3 w-full py-2 bg-gradient-to-r from-fuchsia-500 via-purple-600 to-blue-500 hover:from-purple-700 hover:to-fuchsia-500 text-white font-bold rounded-xl shadow-lg transition text-base"
                      onClick={() => window.location.href = `/book/${book._id}`}
                    >
                      Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default PopularBooks;
