import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiUrl from "../config";

const BookingSummary = ({ flightId }) => {
  const [flightDetails, setFlightDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlightDetails();
  }, [flightId]);

  // ✅ Fetch flight details from PHP backend
  const fetchFlightDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}flight/${flightId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFlightDetails(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch flight details. Please try again.");
      setLoading(false);
    }
  };

  if (loading)
    return <p className="text-center mt-6">Loading booking summary...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
        Booking Summary
      </h2>

      {/* ✅ Flight Details Section */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Flight Details</h3>
        <p className="mt-1">
          <strong>Origin:</strong> {flightDetails.origin}
        </p>
        <p>
          <strong>Destination:</strong> {flightDetails.destination}
        </p>
        <p>
          <strong>Date:</strong> {flightDetails.date}
        </p>
      </div>

      {/* ✅ Passenger Details Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Passenger Details</h3>
        <ul className="mt-2 bg-gray-50 p-4 rounded-lg">
          {flightDetails.passengersDetails.map((passenger, index) => (
            <li key={index} className="border-b py-2">
              <strong>
                {passenger.firstName} {passenger.lastName}
              </strong>{" "}
              - {passenger.gender}, {passenger.age} years
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingSummary;
