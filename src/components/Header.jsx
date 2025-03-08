import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";

const Header = ({ minimal }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // ✅ Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ✅ Navigate with animation
  const handleBookings = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/bookings");
    }, 500);
  };

  return (
    <motion.header
      className="flex justify-between items-center bg-white dark:bg-gray-900 text-black dark:text-white p-4 shadow-xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ✅ Logo - Always on the Left */}
      <div
        className="text-xl font-bold cursor-pointer w-44"
        onClick={() => navigate("/")}
      >
        <img
          src="https://d12lchh0gjjhot.cloudfront.net/qa/uploadFiles/portalLogo/414_1729072841_portal_logo.svg"
          alt="Flight Logo"
        />
      </div>

      {/* ✅ Minimal Mode: Only Show Theme Toggle on the Right */}
      {minimal ? (
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-800 dark:text-gray-200" />
          )}
        </button>
      ) : (
        <>
          {/* ✅ Mobile View: Theme Toggle & Hamburger Menu */}
          <div className="flex sm:hidden items-center gap-3">
            {/* ✅ Mobile Menu Button */}
            <button
              className="text-2xl text-gray-700 dark:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* ✅ Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-4">
            <motion.button
              onClick={handleBookings}
              className="bg-sky-400 px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition"
              whileTap={{ scale: 0.95 }}
              animate={
                isNavigating ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }
              }
              transition={{ duration: 0.5 }}
            >
              My Bookings
            </motion.button>

            {/* ✅ Dark Mode Toggle Button (Desktop) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-800 dark:text-gray-200" />
              )}
            </button>

            {/* ✅ User Icon */}
            <motion.div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-black font-bold">
              {user.email.charAt(0).toUpperCase()}
            </motion.div>

            {/* ✅ Logout Button */}
            <motion.button
              onClick={logout}
              className="bg-red-500 px-4 py-2 text-white rounded-lg hover:bg-red-600 transition"
              whileHover={{ scale: 1.05 }}
            >
              Logout
            </motion.button>
          </div>

          {/* ✅ Mobile Menu Overlay */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-40 z-10 sm:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* ✅ Mobile Menu Panel */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg flex flex-col gap-4 p-6 z-20 sm:hidden"
                initial={{ x: 200 }}
                animate={{ x: 0 }}
                exit={{ x: 200 }}
                transition={{ duration: 0.3 }}
              >
                {/* ✅ Close Button on Right Side */}
                <div className="flex justify-between items-center">
                  {/* ✅ User Avatar on Left */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black font-bold text-lg">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  <button
                    className="text-2xl text-gray-700 dark:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* ✅ My Bookings Button */}
                <button
                  onClick={() => {
                    handleBookings();
                    setMenuOpen(false);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  My Bookings
                </button>

                {/* ✅ Dark Mode Toggle Button (Mobile Menu) */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  {darkMode ? (
                    <FaSun className="text-yellow-400" />
                  ) : (
                    <FaMoon className="text-gray-800 dark:text-gray-200" />
                  )}
                  <span>Toggle Theme</span>
                </button>

                {/* ✅ Logout Button */}
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.header>
  );
};

export default Header;
