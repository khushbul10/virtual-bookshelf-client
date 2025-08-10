import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { a } from "motion/react-client";
import useAxiosSecure from "../hooks/useAxiosSecure";

const COLORS = ["#a21caf", "#6366f1", "#db2777"];

const categoryColor = (cat) =>
  cat === "Fiction"
    ? "#a21caf"
    : cat === "Non-Fiction"
    ? "#6366f1"
    : "#db2777";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [ dbUser, setDbUser ] = useState(null);
  const [books, setBooks] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/books/user?user_email=${user.email}`)
      .then((res) => {
        const list = res.data; // adapt to your API
        setBooks(list);
        // Build summary
        const total = list.length;
        const byCategory = {};
        for (let b of list) {
          byCategory[b.book_category] = (byCategory[b.book_category] || 0) + 1;
        }
        setSummary({ total, byCategory });
      });
  }, [user]);

  useEffect(() => {
    axiosSecure.get(`/users?email=${user?.email}`)
      .then((res) => {
        setDbUser(res.data);
      })
      .catch((err) => {
      });
  },[])

  const chartData = Object.entries(summary.byCategory || {}).map(([cat, value]) => ({
    name: cat,
    value,
    color: categoryColor(cat),
  }));
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-purple-700">Please login to view your profile.</p>
      </div>
    );
  }
  document.title = "Profile - Virtual Bookshelf";
  return (
    <motion.div
      className="max-w-3xl mx-auto pt-20 pb-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Profile Card */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl  border border-purple-100 mb-5"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <img
          src={ dbUser?.photoURL || user.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.displayName || user.email)}
          alt={user.displayName || user.email}
          className="w-32 h-32 rounded-full object-cover border-4 border-fuchsia-200 shadow"
        />
        <div className="flex-1">
          <div className="text-3xl font-bold text-purple-700 mb-1">{ dbUser?.name || user.displayName || "Unnamed"}</div>
          <div className="text-md text-gray-500 mb-2">{ dbUser?.email || user.email}</div>
          <div className="text-lg font-semibold text-fuchsia-700">
            Total Books: <span className="font-bold">{summary.total ?? 0}</span>
          </div>
          <div className="flex gap-3 mt-2 flex-wrap">
            {Object.entries(summary.byCategory || {}).map(([cat, n]) => (
              <span
                key={cat}
                className="bg-purple-100 text-purple-700 rounded-lg px-3 py-1 text-sm font-semibold shadow"
              >
                {cat}: {n}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pie Chart */}
      <div className="bg-white p-8 rounded-3xl border border-purple-50">
        <div className="text-xl font-bold text-purple-700 mb-6">Books by Category</div>
        {chartData.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No books to show.</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {chartData.map((entry, idx) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
