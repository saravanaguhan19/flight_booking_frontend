

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import apiUrl from "../config";

const PassengerDetail = ({ flightDetails, onSubmit }) => {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    if (flightDetails) {
      setPassengers(
        Array.from({ length: flightDetails.passengers }, () => ({
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
        }))
      );
    }
  }, [flightDetails]);

  const handleChange = (index, field, value) => {
    const updatedPassengers = passengers.map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Create the correct payload format
    const payload = {
      origin: flightDetails.origin,
      destination: flightDetails.destination,
      date: flightDetails.date,
      passengersDetails: passengers,
    };

    try {
      const response = await axios.post(`${apiUrl}create-flight`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.status === "success") {
        toast.success("Flight booked successfully!");
        onSubmit(response.data.data.flight_id); // ✅ Trigger Dashboard to handle loading
      } else {
        toast.error("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to save details. Please try again.");
    }
  };

  if (!flightDetails) return null;

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl mb-6 max-w-4xl mx-auto w-full">
      <h3 className="text-lg font-semibold mb-4">
        Enter Passenger Details ({flightDetails.passengers} passengers)
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {passengers.map((passenger, index) => (
          <div key={index} className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="First Name"
              value={passenger.firstName}
              onChange={(e) => handleChange(index, "firstName", e.target.value)}
              className="p-3 border rounded-lg w-full sm:w-[22%] shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={passenger.lastName}
              onChange={(e) => handleChange(index, "lastName", e.target.value)}
              className="p-3 border rounded-lg w-full sm:w-[22%] shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={passenger.age}
              onChange={(e) => handleChange(index, "age", e.target.value)}
              className="p-3 border rounded-lg w-full sm:w-[22%] shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
              min="0"
            />
            <select
              value={passenger.gender}
              onChange={(e) => handleChange(index, "gender", e.target.value)}
              className="p-3 border rounded-lg w-full sm:w-[22%] shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg w-full font-semibold shadow-md hover:bg-blue-700 transition duration-300"
        >
          Submit Passenger Details
        </button>
      </form>
    </div>
  );
};

export default PassengerDetail;
