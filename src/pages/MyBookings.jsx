import { useState, useEffect } from "react";
import axios from "axios";
import BookingModal from "./BookingModal";
import apiUrl from "../config";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            onClick={() => setSelectedBooking(booking)}
            className="cursor-pointer p-4 border rounded-lg mb-4 hover:shadow-lg transition"
          >
            <p>
              <strong>Origin:</strong> {booking.origin}
            </p>
            <p>
              <strong>Destination:</strong> {booking.destination}
            </p>
            <p>
              <strong>Date:</strong> {booking.date}
            </p>
            <p>
              <strong>Total Passengers:</strong>{" "}
              {booking.passengersDetails.length}
            </p>
          </div>
        ))
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
  );
};

export default MyBookings;
