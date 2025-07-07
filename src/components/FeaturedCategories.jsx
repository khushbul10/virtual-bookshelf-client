import React from "react";
import { motion } from "motion/react";
import { FaStar } from "react-icons/fa";

const categories = [
  {
    name: "Fiction",
    icon: "📖",
    color: "from-purple-500 via-fuchsia-500 to-pink-400",
  },
  {
    name: "Non-Fiction",
    icon: "📚",
    color: "from-purple-400 via-indigo-400 to-fuchsia-300",
  },
  {
    name: "Fantasy",
    icon: "🧙‍♂️",
    color: "from-fuchsia-500 via-purple-400 to-pink-400",
  },
];

const FeaturedCategories = () => (
  <motion.section
    className="max-w-5xl mx-auto my-16"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-400 mb-8 drop-shadow-xl">
      <span className="inline-block mr-2 text-purple-500">
        <FaStar />
      </span>{" "}
      Featured Categories
    </h2>
    <div className="flex flex-wrap gap-10 justify-center">
      {categories.map((cat, idx) => (
        <motion.div
          key={cat.name}
          whileHover={{ scale: 1.07, rotate: 2 }}
          className={`min-w-[180px] rounded-2xl shadow-xl p-8 flex flex-col items-center bg-gradient-to-br ${cat.color} border-4 border-white/40 relative`}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + idx * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="text-4xl mb-3 drop-shadow-md">{cat.icon}</span>
          <span className="font-semibold text-white text-lg tracking-wide">
            {cat.name}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default FeaturedCategories;
