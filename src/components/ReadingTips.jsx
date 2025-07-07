import React from "react";
import { motion } from "motion/react";

const tips = [
  "Set small, achievable reading goals.",
  "Take notes or highlight memorable quotes.",
  "Share your thoughts by writing reviews!",
  "Try new genres and authors to expand your taste.",
];

const ReadingTips = () => (
  <motion.section
    className="max-w-5xl mx-auto my-16"
    initial={{ opacity: 0, x: 80 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.9 }}
    viewport={{ once: true }}
  >
    <h2 className="text-2xl font-extrabold text-purple-700 mb-5 flex items-center gap-2">
      <span role="img" aria-label="tip">📌</span> Reading Tips for You
    </h2>
    <ul className="space-y-3">
      {tips.map((tip, idx) => (
        <motion.li
          key={idx}
          className="bg-gradient-to-r from-fuchsia-50 to-white border-l-4 border-purple-400 px-5 py-3 rounded-xl shadow-md text-lg font-medium text-purple-900"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * idx, duration: 0.7 }}
          viewport={{ once: true }}
        >
          {tip}
        </motion.li>
      ))}
    </ul>
  </motion.section>
);

export default ReadingTips;
