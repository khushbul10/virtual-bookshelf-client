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
  <section className="bg-[#ca5cdd] bg-[url('https://www.transparenttextures.com/patterns/3px-tile.png')] rounded-xl relative py-16 px-6">
    {/* Gorgeous full background */}
    {/* <div className="absolute inset-0 -z-20 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"></div>
    <div className="absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div> */}

    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, x: -70 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-extrabold text-white drop-shadow-xl mb-8">
        <span className="inline-block px-3 py-1 mr-2">🌟</span>
        Community Shoutouts
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl bg-white/20 opacity-20 shadow-xl p-6 flex flex-col border-2 border-white/30"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.13, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="italic text-white text-lg mb-3 drop-shadow">
              “{t.text}”
            </p>
            <span className="block text-right text-pink-200 font-semibold">
              {t.user}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default CommunityShoutouts;
