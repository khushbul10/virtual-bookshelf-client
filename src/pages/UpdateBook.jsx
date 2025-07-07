import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const categories = ["Fiction", "Non-Fiction", "Fantasy"];
const readingStatuses = ["Read", "Reading", "Want-to-Read"];

const UpdateBook = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    book_title: "",
    cover_photo: "",
    total_page: "",
    book_author: "",
    book_category: "",
    reading_status: "",
    book_overview: "",
    user_email: "",
    user_name: ""
  });
  const [loading, setLoading] = useState(true);

  // Fetch current book data
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then(res => {
        if (res.data) setForm(res.data);
        else toast.error("Book not found!");
      })
      .catch(() => toast.error("Failed to load book."))
      .finally(() => setLoading(false));
  }, [id]);

  // Handle input change
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const updateData = {
        book_title: form.book_title,
        cover_photo: form.cover_photo,
        total_page: parseInt(form.total_page, 10),
        book_author: form.book_author,
        book_category: form.book_category,
        reading_status: form.reading_status,
        book_overview: form.book_overview
      };
      axios
        .put(`${import.meta.env.VITE_API_URL}/books/${id}`, updateData)
        .then(response => {
          toast.success("Book updated successfully!");
          navigate("/my-books");
        })
        .catch(error => {
          toast.error(error.response?.data?.message || "Update failed!");
        });
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-purple-600 rounded-full"></div>
      </div>
    );
  }
  document.title = "Update Book - Virtual Bookshelf";
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
          Update Book
        </h2>
        {/* Book Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Title</label>
          <input
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            type="text"
            name="book_title"
            required
            value={form.book_title}
            onChange={handleChange}
          />
        </div>
        {/* Cover Photo */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Cover Photo URL</label>
          <input
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            type="url"
            name="cover_photo"
            required
            value={form.cover_photo}
            onChange={handleChange}
          />
        </div>
        {/* Total Pages */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Total Pages</label>
          <input
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            type="number"
            name="total_page"
            min={1}
            required
            value={form.total_page}
            onChange={handleChange}
          />
        </div>
        {/* Author */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Author</label>
          <input
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            type="text"
            name="book_author"
            required
            value={form.book_author}
            onChange={handleChange}
          />
        </div>
        {/* Category */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Category</label>
          <select
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            name="book_category"
            required
            value={form.book_category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {/* Reading Status */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Reading Status</label>
          <select
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            name="reading_status"
            required
            value={form.reading_status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            {readingStatuses.map((status) => (
              <option value={status} key={status}>{status}</option>
            ))}
          </select>
        </div>
        {/* Overview */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-purple-700">Overview</label>
          <textarea
            className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
            name="book_overview"
            rows={4}
            required
            value={form.book_overview}
            onChange={handleChange}
          />
        </div>
        {/* User Email & Name (read-only) */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-purple-700">Your Email</label>
            <input
              className="w-full p-2 rounded-lg border border-purple-200 bg-purple-50 text-purple-900"
              type="email"
              name="user_email"
              value={form.user_email}
              readOnly
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-purple-700">Your Name</label>
            <input
              className="w-full p-2 rounded-lg border border-purple-200 bg-purple-50 text-purple-900"
              type="text"
              name="user_name"
              value={form.user_name}
              readOnly
            />
          </div>
        </div>
        <button
          className="w-full py-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-purple-600 hover:to-fuchsia-500 text-white font-bold rounded-xl mt-4 shadow-lg transition-all text-xl"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </motion.div>
  );
};

export default UpdateBook;
