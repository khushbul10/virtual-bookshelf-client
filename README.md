
# 📚 Virtual Bookshelf

A modern, full-stack web app for book lovers. Catalog your books, write reviews, track reading progress, and join a reading community. Built with React, Tailwind CSS, Framer Motion, Node.js, Express, MongoDB, and Firebase Authentication.

---

## 🚀 Live Demo

- **Frontend:** [https://virtual-bookshelf-d8c25.web.app/](https://virtual-bookshelf-d8c25.web.app/)
- **Backend:** [https://virtual-bookshelf-two.vercel.app/](https://virtual-bookshelf-two.vercel.app/)

---

## ✨ Features

- Add and organize books (title, author, status, cover, and more)
- Write, edit, and delete reviews for each book
- Upvote favorite books (except your own)
- Track reading status & see progress
- Profile dashboard with charts and stats
- Secure authentication (email/password & Google via Firebase)
- JWT-protected backend endpoints
- Responsive, animated, and modern UI
- Smooth page transitions (Framer Motion)
- Fully mobile-friendly and accessible

---

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- Framer Motion (motion)
- React Router
- Axios
- Firebase Authentication
- React Icons
- React Slick (slider)
- Recharts
- React Toastify

### Backend
- Node.js
- Express
- MongoDB Atlas
- Firebase Admin SDK
- dotenv

---

## 📦 NPM Dependencies

### **Frontend**
| Package              | Purpose                                 |
|----------------------|-----------------------------------------|
| @tailwindcss/vite    | Tailwind CSS integration for Vite       |
| axios                | HTTP client                             |
| firebase             | Firebase JS SDK (auth, etc.)            |
| motion               | Animation (Framer Motion v6+)           |
| react                | React core                              |
| react-dom            | React DOM rendering                     |
| react-icons          | Icon library                            |
| react-router         | Routing                                 |
| react-slick          | Carousel/slider                         |
| react-toastify       | Toast notifications                     |
| recharts             | Charting library                        |
| slick-carousel       | Carousel CSS                            |
| tailwindcss          | Utility-first CSS framework             |

### **Backend**
| Package         | Purpose                                    |
|-----------------|--------------------------------------------|
| cors            | Cross-Origin Resource Sharing               |
| dotenv          | Environment variable loading                |
| express         | Web framework                              |
| firebase-admin  | Firebase server-side SDK (token verify)     |
| mongodb         | MongoDB driver                             |

---


---

## ⚡️ Getting Started

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-username/virtual-bookshelf.git
cd virtual-bookshelf
```

### 2. **Frontend Setup**
```bash
cd client
npm install
cp .env.example .env   # Fill in VITE_FIREBASE_xxx and VITE_API_URL
npm run dev
```

### 3. **Backend Setup**
```bash
cd ../server
npm install
cp .env.example .env   # Fill in DB_USER, DB_PASS, FIREBASE_PROJECT_ID, etc.
npm run dev
```

### 4. **Open in Browser**
- Frontend: [https://virtual-bookshelf-d8c25.web.app/](https://virtual-bookshelf-d8c25.web.app/)
- Backend: [https://virtual-bookshelf-two.vercel.app/](https://virtual-bookshelf-two.vercel.app/)

---



## 🙌 Contributing

Pull requests are welcome! Please open issues or contact for suggestions, improvements, or bug reports.

---


---

**Happy Reading! 📖**
