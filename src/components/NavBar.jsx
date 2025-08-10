import React, { useState } from "react";
import { NavLink } from "react-router"; 
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { motion } from "motion/react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import logo from "../assets/download.png"; // Assuming you have a logo image

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/bookshelf", label: "Bookshelf" },
  { to: "/add-book", label: "Add Book", protected: true },
  { to: "/my-books", label: "My Books", protected: true },
  { to: "/profile", label: "Profile", protected: true },
];

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const [dbPhoto, setDbPhoto] = useState(null);

  axiosSecure.get(`/users?email=${user?.email}`)
    .then((res) => {
      if (res.data && res.data.photoURL) {
        setDbPhoto(res.data.photoURL);
      }
    })
    .catch((error) => {
      setDbPhoto(null);
    });

  

  const menuLinks = navLinks.filter(link => !link.protected || user);
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-gradient-to-r from-purple-700/90 via-fuchsia-700/80 to-pink-600/80 backdrop-blur-lg shadow-xl border-b border-purple-200/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3 relative">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-white font-extrabold text-2xl tracking-tight">
          <span className="text-3xl"> <img src={logo} className="size-10" ></img> </span>
          <span className="drop-shadow-xl">Virtual Bookshelf</span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          {menuLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `relative py-2 px-3  rounded-xl font-medium text-lg transition 
                   ${isActive ? "text-purple-50 bg-white/20" : "text-purple-50 hover:text-fuchsia-100"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{label}</span>
                    {/* {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute left-0 -bottom-1 w-full h-1 rounded bg-gradient-to-r from-fuchsia-400 to-pink-400"
                        style={{ zIndex: -1 }}
                      />
                    )} */}
                  </>
                )}
              </NavLink>
            </li>
          ))}
          {user ? (
            <>
              <li>
                <button
                  onClick={logoutUser}
                  className="ml-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-fuchsia-100 rounded-xl font-semibold shadow transition"
                >
                  Logout
                </button>
              </li>
              <li>
                <NavLink to="/profile" className="flex items-center gap-2 text-fuchsia-200 hover:text-fuchsia-100 font-bold">
                  {dbPhoto ? (
                    <img
                      src={dbPhoto}
                      alt="Profile"
                      className="w-9 h-9 rounded-full border-2 border-fuchsia-200 shadow"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl" />
                  )}
                  <span className="hidden md:inline">{user.displayName || user.email}</span>
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-pink-400 rounded-xl text-white font-bold shadow hover:scale-105 transition"
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-white text-3xl" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>

          <div className={`fixed md:hidden top-0 right-0 h-screen w-full max-w-xs bg-gradient-to-br from-purple-800 to-pink-600 shadow-2xl z-50 px-7 pt-24 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
            <button className="absolute top-4 right-4 text-2xl text-white" onClick={() => setOpen(false)} aria-label="Close Menu">
              <FaTimes />
            </button>
            <ul className="flex flex-col ">
              {
                user && <li className="flex items-center gap-3 mb-4">
              {dbPhoto ? (
                <img
                  src={dbPhoto }
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-fuchsia-200 shadow"
                />
              ) : (
                <FaUserCircle className="text-3xl text-fuchsia-100" />
              )}
              <span className="font-bold text-fuchsia-100">{user.displayName || user.email}</span>
            </li>
              }
              {menuLinks.map(({ to, label }) => (
                <li key={to}>
            <NavLink
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-3 text-lg font-semibold transition rounded
                ${isActive ? "bg-fuchsia-600 text-white" : "text-fuchsia-100 hover:bg-fuchsia-600"}`
              }
            >
              {label}
            </NavLink>
                </li>
              ))}
              {user ? (
                <>
            <li>
              <button
                onClick={() => { logoutUser(); setOpen(false); }}
                className="w-full px-4 my-4 py-2 bg-white/20 hover:bg-white/30 text-fuchsia-100 rounded-xl font-semibold shadow transition"
              >
                Logout
              </button>
            </li>
                </>
              ) : (
                <li>
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="block px-4 my-4 py-2 bg-gradient-to-r from-fuchsia-500 to-pink-400 rounded-xl text-white font-bold shadow text-center"
            >
              Login
            </NavLink>
                </li>
              )}
                   
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
