

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false); // ✅ Track navigation state

  // ✅ Smoothly transition when clicking "My Bookings"
  const handleBookings = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/bookings");
    }, 500); // ✅ Wait for animation before navigating
  };

  return (
    <motion.header
      className="flex justify-between items-center bg-white p-4 shadow-xl"
      initial={{ opacity: 0, y: -10 }} // ✅ Fade in on load
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ✅ Logo on the left (Click navigates to Dashboard) */}
      <div
        className="text-xl font-bold cursor-pointer w-44"
        onClick={() => navigate("/")}
      >
        <img
          src="https://d12lchh0gjjhot.cloudfront.net/qa/uploadFiles/portalLogo/414_1729072841_portal_logo.svg"
          alt="Flight Logo"
        />
      </div>

      {/* ✅ User Info & Logout on the right */}
      {user && (
        <div className="flex items-center gap-4">
          {/* ✅ "My Bookings" button with motion effect */}
          <motion.button
            onClick={handleBookings}
            className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition"
            whileTap={{ scale: 0.95 }} // ✅ Button tap animation
            animate={
              isNavigating ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }
            } // ✅ Smooth exit effect
            transition={{ duration: 0.5 }}
          >
            My Bookings
          </motion.button>

          {/* ✅ Round div with first letter of email */}
          <motion.div
            className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-black font-bold"
            whileHover={{ scale: 1.1 }} // ✅ Hover effect
          >
            {user.email.charAt(0).toUpperCase()}
          </motion.div>

          {/* ✅ Logout button */}
          <motion.button
            onClick={logout}
            className="bg-red-500 px-4 py-2 text-white rounded-lg hover:bg-red-600 transition"
            whileHover={{ scale: 1.05 }} // ✅ Slight hover effect
          >
            Logout
          </motion.button>
        </div>
      )}
    </motion.header>
  );
};

export default Header;
