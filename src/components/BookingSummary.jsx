import { useState, useEffect } from "react";
import axios from "axios";
import { useFlightBooking } from "../context/FlightBookingContext";
import apiUrl from "../config";
import { motion } from "framer-motion";

const BookingSummary = () => {
  const { bookingId } = useFlightBooking(); // ✅ Get flightId from context
  const [flightDetails, setFlightDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bookingId) {
      fetchFlightDetails();
    }
  }, [bookingId]);

  // ✅ Fetch flight details from PHP backend
  const fetchFlightDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}flight/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("API Response:", response.data); // ✅ Debugging Log

      if (response.data.status === "success" && response.data.data) {
        setFlightDetails(response.data.data);
      } else {
        setError("No flight details found.");
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch flight details. Please try again.");
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
        Loading booking summary...
      </p>
    );
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mt-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
        Booking Summary
      </h2>

      {/* ✅ Flight Details Section */}
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Flight Details
        </h3>
        <p className="mt-1 text-gray-700 dark:text-gray-300">
          <strong>Origin:</strong> {flightDetails?.origin || "N/A"}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Destination:</strong> {flightDetails?.destination || "N/A"}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Date:</strong> {flightDetails?.date || "N/A"}
        </p>
      </div>

      {/* ✅ Passenger Details Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Passenger Details
        </h3>
        <ul className="mt-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          {flightDetails?.passengersDetails?.length > 0 ? (
            flightDetails.passengersDetails.map((passenger, index) => (
              <li
                key={index}
                className="border-b py-2 text-gray-700 dark:text-gray-300"
              >
                <strong>
                  {passenger.firstName} {passenger.lastName}
                </strong>{" "}
                - {passenger.gender}, {passenger.age} years
              </li>
            ))
          ) : (
            <p className="text-red-500">No passenger details found.</p>
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export default BookingSummary;
