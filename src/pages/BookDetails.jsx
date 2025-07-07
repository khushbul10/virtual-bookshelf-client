import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { FaThumbsUp } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

import useAuth from "../hooks/useAuth";
import { a } from "motion/react-client";
import LoadingPage from "./LoadingPage";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [myReview, setMyReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upvoteLoading, setUpvoteLoading] = useState(false);

  // Fetch book details
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then((res) => setBook(res.data))
      .catch(() => toast.error("Failed to load book."))
      .finally(() => setLoading(false));
  }, [id]);

  // Fetch reviews and set myReview
  useEffect(() => {
    if (!id) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/reviews?book_id=${id}`)
      .then((res) => {
        const reviewList = res.data || [];
        setReviews(reviewList);
        if (user?.email) {
          setMyReview(
            reviewList.find((r) => r.user_email === user.email) || null
          );
        }
      })
      .catch(() => toast.error("Failed to load reviews."));
  }, [id, user]);

  // Upvote handler
  const handleUpvote = async () => {
    if (!user) {
      toast.error("You must login to upvote.");
      return;
    }
    if (book.user_email === user.email) {
      toast.error("You cannot upvote your own book.");
      return;
    }
    setUpvoteLoading(true);
    axios
      .put(`${import.meta.env.VITE_API_URL}/books/upvote/${id}`, {
        user_email: user.email,
      })
      .then((res) => {
        if (res.data.success) {
          setBook((prev) => ({ ...prev, upvote: res.data.updatedUpvote }));
          toast.success("Upvoted successfully!");
        } else {
          toast.error(res.data.message || "Failed to upvote.");
        }
      })
      .catch(() => toast.error("Failed to upvote."))
      .finally(() => setUpvoteLoading(false));
  };

  // Review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      toast.error("Review cannot be empty.");
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, {
        book_id: id,
        user_email: user.email,
        review_text: reviewText,
      });
      if (res.data.success) {
        setReviews(res.data.reviews);
        setReviewText("");
        setMyReview(
          res.data.reviews.find((r) => r.user_email === user.email) || null
        );
        toast.success("Review added!");
      }
    } catch {
      toast.error("Failed to submit review.");
    }
  };

  // Edit review
  const handleEditReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      toast.error("Review cannot be empty.");
      return;
    }
    axios
      .put(`${import.meta.env.VITE_API_URL}/reviews/${myReview._id}`, {
        review_text: reviewText,
        book_id: id,
      })
      .then((res) => {
        if (res.data.success) {
          setReviews(res.data.reviews);
          setMyReview(res.data.updatedReview || null);
          setReviewText("");
          toast.success("Review updated!");
        }
      })
      .catch(() => toast.error("Failed to update review."));
  };

  // Delete review
  const handleDeleteReview = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/reviews/${myReview._id}`
      );
      if (res.data.success) {
        setReviews(res.data.reviews);
        setReviewText("");
        setMyReview(null);
        toast.success("Review deleted!");
      }
    } catch {
      toast.error("Failed to delete review.");
    }
  };

  // reading tracker
  const statusOrder = ["Want-to-Read", "Reading", "Read"];
  const statusColors = {
    "Want-to-Read": "bg-gray-200 text-gray-800",
    Reading: "bg-yellow-200 text-yellow-800",
    Read: "bg-green-200 text-green-800",
  };

  const [statusUpdating, setStatusUpdating] = useState(false);

  const canUpdateStatus =
    user?.email === book?.user_email &&
    statusOrder.indexOf(book?.reading_status) < statusOrder.length - 1;

  const handleStatusUpdate = async () => {
    if (!canUpdateStatus) return;
    setStatusUpdating(true);
    const nextStatus =
      statusOrder[statusOrder.indexOf(book.reading_status) + 1];
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/books/${book._id}/status`,
        {
          user_email: user.email,
          new_status: nextStatus,
        }
      );
      if (res.data.success) {
        setBook({ ...book, reading_status: nextStatus });
        toast.success(`Status updated to "${nextStatus}"!`);
      } else {
        toast.error(res.data.message || "Failed to update status.");
      }
    } catch (err) {
      toast.error("Failed to update status.");
    } finally {
      setStatusUpdating(false);
    }
  };

  if (loading) {
    return (
      <LoadingPage></LoadingPage>
    );
  }
  if (!book) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl text-purple-700">
        Book not found.
      </div>
    );
  }
  document.title = `${book?.book_title} - Virtual Bookshelf`;
  return (
    <motion.div
      className="max-w-4xl mx-auto pt-20 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Book Card */}
      <motion.div
        className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-3xl shadow-xl border border-purple-100 mb-8"
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <img
          src={book.cover_photo}
          alt={book.book_title}
          className="w-40 h-56 object-cover rounded-2xl shadow-lg border-4 border-purple-100"
        />
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-purple-700 mb-2">
            {book.book_title}
          </h2>
          <div className="text-lg text-fuchsia-700 mb-1">
            by {book.book_author}
          </div>
          <div className="flex gap-3 mb-2">
            <span className="px-3 py-1 rounded-xl bg-fuchsia-100 text-fuchsia-700 text-xs">
              {book.book_category}
            </span>
            

            <span className="px-3 py-1 rounded-xl bg-pink-100 text-pink-700 text-xs">
              {book.total_page} pages
            </span>
          </div>


          {/* Reading Tracker */}
          <div className="">
            <div className="flex items-center gap-2">
              {statusOrder.map((stat, i) => (
                <React.Fragment key={stat}>
                  <span
                    className={
                      "px-4 py-1 rounded-full font-semibold text-sm transition-all duration-300 " +
                      (book.reading_status === stat
                        ? "bg-gradient-to-r from-fuchsia-400 to-purple-600 text-white shadow-lg scale-110"
                        : statusColors[stat])
                    }
                  >
                    {stat}
                  </span>
                  {i < statusOrder.length - 1 && (
                    <FaChevronRight className="text-gray-400" />
                  )}
                </React.Fragment>
              ))}
            </div>
            {canUpdateStatus && (
              <button
                className="mt-3 px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold shadow hover:bg-fuchsia-500 transition disabled:opacity-60"
                onClick={handleStatusUpdate}
                disabled={statusUpdating}
              >
                Mark as "
                {statusOrder[statusOrder.indexOf(book.reading_status) + 1]}"
              </button>
            )}
            {user?.email === book.user_email && !canUpdateStatus && (
              <div className="text-green-600 font-semibold mt-2">
                🎉 You finished this book!
              </div>
            )}
          </div>

          <div className="text-gray-800 my-2">{book.book_overview}</div>
          <div className="flex items-center gap-4 mt-4">
            <button
              className="flex items-center gap-1 bg-purple-600 hover:bg-fuchsia-500 text-white px-4 py-2 rounded-lg font-semibold transition shadow"
              onClick={handleUpvote}
              disabled={upvoteLoading}
            >
              <FaThumbsUp className="mr-2" />
              Upvote&nbsp;({book.upvote ?? 0})
            </button>
            <div className="text-sm text-gray-500">
              Added by: <span className="font-semibold">{book.user_name}</span>{" "}
              ({book.user_email})
            </div>
          </div>
        </div>
      </motion.div>

      {/* Review Section */}
      <div className="bg-white rounded-2xl shadow p-6 border border-purple-50">
        <h3 className="text-xl font-bold text-purple-700 mb-4">Reviews</h3>

        {user && (
          <>
            {!myReview ? (
              // If user hasn't reviewed, show the add form
              <form
                className="mb-4 flex flex-col md:flex-row gap-2"
                onSubmit={handleReviewSubmit}
              >
                <textarea
                  className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
                  rows={2}
                  placeholder="Write your review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-fuchsia-500 transition"
                  type="submit"
                >
                  Post
                </button>
              </form>
            ) : (
              // If user has reviewed, show the edit/delete form
              <form
                className="mb-4 flex flex-col md:flex-row gap-2"
                onSubmit={handleEditReview}
              >
                <textarea
                  className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-fuchsia-400"
                  rows={2}
                  placeholder="Edit your review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <div className="flex gap-2 items-center">
                  <button
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-fuchsia-500 transition"
                    type="submit"
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-200 text-purple-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                    type="button"
                    onClick={handleDeleteReview}
                  >
                    Delete
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="text-gray-500">No reviews yet.</div>
          ) : (
            reviews.map((r) => (
              <div key={r._id} className="border-b border-purple-50 pb-2 mb-2">
                <div className="flex items-center gap-2 text-purple-700 font-semibold text-sm">
                  {r.user_email}
                  {user?.email === r.user_email && (
                    <span className="ml-1 text-xs text-fuchsia-600">(you)</span>
                  )}
                </div>
                <div className="text-gray-800">{r.review_text}</div>
                <div className="text-xs text-gray-400">
                  {new Date(r.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BookDetails;
