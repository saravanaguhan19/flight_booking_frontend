

import { useState, useEffect } from "react";
import axios from "axios";
import BookingModal from "./BookingModal";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import apiUrl from "../config";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaUsers,
  FaArrowLeft,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ Fetch all user bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${apiUrl}bookings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookings(response.data.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  // ✅ Open Delete Confirmation Modal
  const confirmDelete = (bookingId) => {
    setBookingToDelete(bookingId);
    setShowDeleteModal(true);
  };

  // ✅ Handle Booking Deletion
  const handleDeleteBooking = async () => {
    if (!bookingToDelete) return;
    setShowDeleteModal(false);

    toast.loading("Deleting booking...", { id: "deleteToast" });

    try {
      const response = await axios.delete(
        `${apiUrl}delete-booking/${bookingToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Booking deleted successfully!", { id: "deleteToast" });
        fetchBookings(); // Refresh bookings
      } else {
        toast.error("Failed to delete booking.", { id: "deleteToast" });
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="max-w-5xl mx-auto py-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-indigo-400">
            ✈️ My Flight Bookings
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center bg-blue-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-indigo-600 transition duration-300"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </button>
        </div>

        {bookings.length === 0 ? (
          <p className="text-center text-lg text-gray-600 dark:text-gray-400">
            No bookings found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="relative cursor-pointer bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition transform hover:-translate-y-1"
              >
                {/* ❌ Delete Button */}
                <button
                  onClick={() => confirmDelete(booking.id)}
                  className="absolute top-3 right-3 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500"
                >
                  <FaTimes size={18} />
                </button>

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-blue-700 dark:text-indigo-400">
                    {booking.origin}{" "}
                    <FaPlaneDeparture className="inline-block ml-2" />
                  </h3>
                  <h3 className="text-xl font-semibold text-blue-700 dark:text-indigo-400">
                    <FaPlaneArrival className="inline-block mr-2" />{" "}
                    {booking.destination}
                  </h3>
                </div>

                <div className="mt-4">
                  <p className="flex items-center text-gray-700 dark:text-gray-300">
                    <FaCalendarAlt className="mr-2 text-blue-500 dark:text-indigo-400" />
                    <strong>Date:</strong> {booking.date}
                  </p>
                  <p className="flex items-center text-gray-700 dark:text-gray-300">
                    <FaUsers className="mr-2 text-blue-500 dark:text-indigo-400" />
                    <strong>Passengers:</strong>{" "}
                    {booking.passengersDetails.length}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedBooking(booking)}
                  className="mt-4 w-full bg-blue-600 dark:bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-indigo-600 transition duration-300"
                >
                  View & Edit Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Show Modal When Booking is Clicked */}
        {selectedBooking && (
          <BookingModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            onUpdate={fetchBookings}
          />
        )}

        {/* ✅ Delete Confirmation Modal with Blurry Transparent Background */}
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 bg-gray-200 bg-opacity-30 dark:bg-gray-800/50 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-center text-red-600 dark:text-red-400">
                Confirm Deletion
              </h3>
              <p className="text-center text-gray-700 dark:text-gray-300 my-4">
                Are you sure you want to delete this booking? This action cannot
                be undone.
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteBooking}
                  className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-400 dark:bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
