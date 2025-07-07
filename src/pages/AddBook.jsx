import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { motion } from "motion/react";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const categories = ["Fiction", "Non-Fiction", "Fantasy"];
const readingStatuses = ["Read", "Reading", "Want-to-Read"];

const AddBook = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please login to add a book!");
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newBook = {
      book_title: form.book_title.value,
      cover_photo: form.cover_photo.value,
      total_page: parseInt(form.total_page.value, 10),
      book_author: form.book_author.value,
      book_category: form.book_category.value,
      reading_status: form.reading_status.value,
      book_overview: form.book_overview.value,
      user_email: user.email,
      user_name: user.displayName || "",
      upvote: 0,
    };

    try {

      axiosSecure.post(`/books`, newBook)
        .then((response) => {
          toast.success("Book added successfully!");
          navigate("/my-books");
        })
        .catch((error) => {
          throw new Error(error.response?.data?.message || "Failed to add book");
        });
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
    }
  };
  document.title = "Add Book - Virtual Bookshelf";

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-purple-100 via-fuchsia-100 to-pink-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl w-full border border-purple-200"
      >
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center drop-shadow">
          Add a New Book
        </h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Title</label>
          <input
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            type="text"
            name="book_title"
            required
            placeholder="Book Title"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Cover Photo URL</label>
          <input
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            type="url"
            name="cover_photo"
            required
            placeholder="https://..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Total Pages</label>
          <input
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            type="number"
            name="total_page"
            min={1}
            required
            placeholder="Total Pages"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Author</label>
          <input
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            type="text"
            name="book_author"
            required
            placeholder="Author Name"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Category</label>
          <select
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            name="book_category"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Reading Status</label>
          <select
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            name="reading_status"
            required
          >
            <option value="">Select Status</option>
            {readingStatuses.map((status) => (
              <option value={status} key={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Overview</label>
          <textarea
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            name="book_overview"
            rows={4}
            required
            placeholder="Short description or review"
          />
        </div>

        {/* Display user info as read-only */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-purple-700">Your Email</label>
            <input
              className="w-full p-2 rounded-lg border border-purple-200 bg-purple-50 text-purple-900"
              type="email"
              name="user_email"
              value={user?.email || ""}
              readOnly
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-purple-700">Your Name</label>
            <input
              className="w-full p-2 rounded-lg border border-purple-200 bg-purple-50 text-purple-900"
              type="text"
              name="user_name"
              value={user?.displayName || ""}
              readOnly
            />
          </div>
        </div>

        <button
          className="w-full py-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-purple-600 hover:to-fuchsia-500 text-white font-bold rounded-xl mt-4 shadow-lg transition-all text-xl"
          type="submit"
        >
          Add Book
        </button>
      </form>
    </motion.div>
  );
};

export default AddBook;
