import React from "react";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "I found so many gems thanks to Virtual Bookshelf’s reviews!",
    user: "— AvidReader99",
  },
  {
    text: "Tracking my reading here keeps me motivated every month.",
    user: "— BookWorm23",
  },
  {
    text: "Upvoting books makes it so easy to find popular picks!",
    user: "— NovelLoverX",
  },
];

const CommunityShoutouts = () => (
  <motion.section
    className="max-w-5xl mx-auto my-16"
    initial={{ opacity: 0, x: -70 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-400 mb-8 drop-shadow-xl">
      <span className="inline-block px-3 py-1  mr-2 ">🌟</span>
      Community Shoutouts
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((t, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.03 }}
          className="rounded-2xl bg-gradient-to-br from-white via-fuchsia-100 to-purple-50 shadow-2xl p-6 flex flex-col"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + idx * 0.13, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="italic text-purple-900 text-lg mb-3">“{t.text}”</p>
          <span className="block text-right text-purple-500 font-semibold">{t.user}</span>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default CommunityShoutouts;
