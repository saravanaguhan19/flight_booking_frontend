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
} from "react-icons/fa";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto py-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-600">
            ✈️ My Flight Bookings
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </button>
        </div>

        {bookings.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No bookings found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                onClick={() => setSelectedBooking(booking)}
                className="cursor-pointer bg-white p-5 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-blue-700">
                    {booking.origin}{" "}
                    <FaPlaneDeparture className="inline-block ml-2" />
                  </h3>
                  <h3 className="text-xl font-semibold text-blue-700">
                    <FaPlaneArrival className="inline-block mr-2" />{" "}
                    {booking.destination}
                  </h3>
                </div>

                <div className="mt-4">
                  <p className="flex items-center text-gray-700">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <strong>Date:</strong> {booking.date}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FaUsers className="mr-2 text-blue-500" />
                    <strong>Passengers:</strong>{" "}
                    {booking.passengersDetails.length}
                  </p>
                </div>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
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
      </div>
    </div>
  );
};

export default MyBookings;
