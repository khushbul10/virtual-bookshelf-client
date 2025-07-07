import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaThumbsUp, FaBookOpen } from "react-icons/fa";
import LoadingPage from "./LoadingPage";

const statuses = ["All", "Read", "Reading", "Want-to-Read"];

const BookShelf = () => {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // Fetch all books
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/books`)
      .then((res) => {
        const data = res.data.books || res.data; // support both response types
        setBooks(data);
        setAllBooks(data);
      })
      .catch(() => toast.error("Failed to load books!"))
      .finally(() => setLoading(false));
  }, []);

  // Search & filter
  useEffect(() => {
    let filtered = allBooks;
    if (status !== "All") {
      filtered = filtered.filter((b) => b.reading_status === status);
    }
    if (search.trim()) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.book_title?.toLowerCase().includes(s) ||
          b.book_author?.toLowerCase().includes(s)
      );
    }
    setBooks(filtered);
  }, [search, status, allBooks]);
  if(loading && allBooks.length === 0) {
    return (
      <LoadingPage></LoadingPage>
    )
  }
  document.title = "Book Shelf - Virtual Bookshelf";
  return (
    <motion.div
      className="max-w-7xl mx-auto pt-20 pb-16 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <h2 className="text-3xl font-bold text-purple-700 drop-shadow flex items-center gap-2">
          <FaBookOpen className="text-2xl text-fuchsia-500" /> Bookshelf
        </h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by title or author"
            className="p-2 rounded-xl border border-purple-300 bg-white focus:outline-fuchsia-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-2 rounded-xl border border-purple-300 bg-white focus:outline-fuchsia-500 transition"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center text-lg text-purple-500 mt-20">
          No books found.
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
        >
          {books.map((book, idx) => (
            <motion.div
              key={book._id || idx}
              className="bg-white rounded-3xl shadow-xl p-5 border border-purple-100 flex flex-col gap-2 hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="w-28 h-40 object-cover rounded-xl mx-auto mb-3 shadow-lg border-4 border-purple-50"
              />
              <h3 className="text-lg font-bold text-purple-700 mb-0.5">{book.book_title}</h3>
              <div className="text-xs text-fuchsia-700 mb-2">
                by {book.book_author}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs rounded bg-fuchsia-100 text-fuchsia-700">
                  {book.book_category}
                </span>
                <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                  {book.reading_status}
                </span>
              </div>
              <p className="text-xs mt-2 text-gray-700 line-clamp-2">
                {book.book_overview}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="flex items-center gap-1 text-purple-500 font-semibold text-sm">
                  <FaThumbsUp /> {book.upvote ?? 0}
                </span>
                <span className="px-2 py-1 text-xs rounded bg-pink-100 text-pink-700">
                  {book.total_page} pages
                </span>
              </div>
              <button
                className="mt-3 w-full py-2 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-purple-600 hover:to-fuchsia-500 text-white font-semibold rounded-xl shadow transition"
                onClick={() => window.location.href = `/book/${book._id}`}
              >
                Details
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BookShelf;
