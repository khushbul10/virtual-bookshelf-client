import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
import ConfirmModal from "../components/ConfirmModal";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch user's own books
  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    axiosSecure
      .get(`/books/user?user_email=${user.email}`)
      .then((res) => setBooks(res.data || []))
      .catch(() => toast.error("Failed to load your books!"))
      .finally(() => setLoading(false));
  }, [user.email]);

  // Open modal for delete
  const askDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    axiosSecure
      .delete(`/books/${deleteId}`, { data: { user_email: user.email } })
      .then(() => {
        toast.success("Book deleted!");
        setBooks((prev) => prev.filter((book) => book._id !== deleteId));
      })
      .catch(() => toast.error("Delete failed!"))
      .finally(() => {
        setModalOpen(false);
        setDeleteId(null);
      });
  };

  // Edit book
  const handleEdit = (id) => {
    navigate(`/update-book/${id}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-purple-700">Please login to see your books.</p>
      </div>
    );
  }
  document.title = "My Books - Virtual Bookshelf";
  return (
    <motion.div
      className="max-w-6xl mx-auto pt-20 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center drop-shadow">
        My Bookshelf
      </h2>
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center text-lg text-purple-500">
          You haven’t added any books yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          {books.map((book, idx) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * idx, duration: 0.7 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-3xl shadow-xl p-6 border border-purple-200 flex flex-col gap-2"
            >
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="w-32 h-44 object-cover rounded-xl mx-auto mb-4 shadow-lg border-4 border-purple-100"
              />
              <h3 className="text-xl font-bold text-purple-700 mb-1">{book.book_title}</h3>
              <p className="text-sm text-fuchsia-700">by {book.book_author}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 text-xs rounded bg-fuchsia-100 text-fuchsia-700">
                  {book.book_category}
                </span>
                <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                  {book.reading_status}
                </span>
                <span className="px-2 py-1 text-xs rounded bg-pink-100 text-pink-700">
                  {book.total_page} pages
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                {book.book_overview}
              </p>
              <div className="flex gap-4 mt-4 justify-center">
                <button
                  onClick={() => handleEdit(book._id)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow hover:from-fuchsia-500 hover:to-purple-600 transition flex items-center gap-2"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => askDelete(book._id)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-fuchsia-700 text-white shadow hover:from-fuchsia-600 hover:to-pink-700 transition flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Book?"
      >
        Are you sure you want to delete this book? This action cannot be undone.
      </ConfirmModal>
    </motion.div>
  );
};

export default MyBooks;
