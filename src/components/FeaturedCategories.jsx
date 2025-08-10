import React from "react";
import { motion } from "motion/react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const categories = [
  {
    name: "Fiction",
    icon: "/fiction.png",
    description: "Dive into captivating tales from diverse worlds and eras.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Non-Fiction",
    icon: "/science.png",
    description:
      "Expand your knowledge with insightful real-world stories and facts.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Fantasy",
    icon: "/fantasy.png",
    description: "Embark on magical adventures filled with mythical wonders.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
  },
];

const FeaturedCategories = () => (
  <motion.section
    className="relative max-w-7xl bg-[url('/Papellila.jpg')] bg-cover bg-center mx-auto p-10 rounded-3xl my-16 overflow-hidden"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] pointer-events-none"></div>

    {/* Content */}
    <div className="relative z-10">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-400 mb-8 drop-shadow-xl flex items-center gap-2">
        <span className="text-purple-500">
          <FaStar />
        </span>
        Featured Categories
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="rounded-3xl overflow-hidden"
      >
        {categories.map((cat, idx) => (
          <SwiperSlide key={cat.name}>
            <div className="relative h-[380px] flex items-center justify-center">
              <motion.div
                className="relative z-10 text-center px-6 max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <span className="block mb-4">
                  <img src={cat.icon} className="size-40 mx-auto" alt="" />
                </span>

                <h3
                  style={{ fontFamily: "'Edu NSW ACT Cursive', cursive" }}
                  className="text-4xl font-semibold text-purple-900"
                >
                  {cat.name}
                </h3>
                <p className="mt-2 text-xl text-purple-800 font-handwriting leading-relaxed">
                  {cat.description}
                </p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </motion.section>
);

export default FeaturedCategories;
