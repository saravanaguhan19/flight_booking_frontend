import { useState } from "react";
import axios from "axios";
import { FaTimes, FaEdit } from "react-icons/fa";
import apiUrl from "../config";
import toast from "react-hot-toast";

const BookingModal = ({ booking, onClose, onUpdate }) => {
  const [editedBooking, setEditedBooking] = useState(booking);
  const [editingPassengerIndex, setEditingPassengerIndex] = useState(null);

  // ✅ Handle Flight Change
  const handleChange = (e) => {
    setEditedBooking({ ...editedBooking, [e.target.name]: e.target.value });
  };

  // ✅ Handle Passenger Change
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = editedBooking.passengersDetails.map(
      (passenger, i) =>
        i === index ? { ...passenger, [field]: value } : passenger
    );
    setEditedBooking({
      ...editedBooking,
      passengersDetails: updatedPassengers,
    });
  };

  // ✅ Save Changes
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}update-booking/${booking.id}`,
        editedBooking,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Booking updated successfully!");
        onUpdate();
        onClose();
      } else {
        toast.error("Error updating booking.");
      }
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-30 dark:bg-gray-800/50 backdrop-blur-md">
      {/* Booking Modal */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-lg w-full shadow-lg border dark:border-gray-700 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            View & Edit Booking
          </h2>
          <button onClick={onClose} className="text-red-500 dark:text-red-400">
            <FaTimes />
          </button>
        </div>

        {/* ✅ Edit Flight Details */}
        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300">
            Origin
          </label>
          <input
            type="text"
            name="origin"
            value={editedBooking.origin}
            onChange={handleChange}
            className="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300">
            Destination
          </label>
          <input
            type="text"
            name="destination"
            value={editedBooking.destination}
            onChange={handleChange}
            className="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300">Date</label>
          <input
            type="date"
            name="date"
            value={editedBooking.date}
            onChange={handleChange}
            className="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded"
          />
        </div>

        {/* ✅ Edit Passenger Details */}
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Passenger Details
        </h3>
        {editedBooking.passengersDetails.map((passenger, index) => (
          <div key={index} className="mb-4 flex items-center justify-between">
            <p className="text-gray-700 dark:text-gray-300">
              {passenger.firstName} {passenger.lastName} ({passenger.gender},{" "}
              {passenger.age} years)
            </p>
            <button
              onClick={() => setEditingPassengerIndex(index)}
              className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
            >
              <FaEdit />
            </button>
          </div>
        ))}

        <button
          onClick={handleSave}
          className="bg-blue-600 dark:bg-indigo-500 text-white w-full p-2 rounded hover:bg-blue-700 dark:hover:bg-indigo-600 transition"
        >
          Save Changes
        </button>
      </div>

      {/* ✅ Passenger Edit Popup (No Black Background) */}
      {editingPassengerIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-lg border dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Edit Passenger Details
            </h3>

            <input
              type="text"
              value={
                editedBooking.passengersDetails[editingPassengerIndex].firstName
              }
              onChange={(e) =>
                handlePassengerChange(
                  editingPassengerIndex,
                  "firstName",
                  e.target.value
                )
              }
              className="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded mb-2"
              placeholder="First Name"
            />
            <input
              type="text"
              value={
                editedBooking.passengersDetails[editingPassengerIndex].lastName
              }
              onChange={(e) =>
                handlePassengerChange(
                  editingPassengerIndex,
                  "lastName",
                  e.target.value
                )
              }
              className="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded mb-2"
              placeholder="Last Name"
            />
            <input
              type="number"
              value={editedBooking.passengersDetails[editingPassengerIndex].age}
              onChange={(e) =>
                handlePassengerChange(
                  editingPassengerIndex,
                  "age",
                  e.target.value
                )
              }
              className="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded mb-2"
              placeholder="Age"
            />
            <select
              value={
                editedBooking.passengersDetails[editingPassengerIndex].gender
              }
              onChange={(e) =>
                handlePassengerChange(
                  editingPassengerIndex,
                  "gender",
                  e.target.value
                )
              }
              className="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setEditingPassengerIndex(null)}
                className="text-red-500 dark:text-red-400 mr-4"
              >
                Cancel
              </button>
              <button
                onClick={() => setEditingPassengerIndex(null)}
                className="bg-blue-600 dark:bg-indigo-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-indigo-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingModal;
