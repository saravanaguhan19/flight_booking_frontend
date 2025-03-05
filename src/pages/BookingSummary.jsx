import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // ✅ Icons for edit & delete
import { toast } from "react-toastify";
import apiUrl from "../config";

const BookingSummary = () => {
  const { flightId } = useParams(); // ✅ Get flight ID from URL
  const [flightDetails, setFlightDetails] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPassenger, setEditingPassenger] = useState(null); // ✅ Track passenger being edited
  const [editedPassenger, setEditedPassenger] = useState({}); // ✅ Store edited data

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
      console.log("booking summary details", response.data.data);
      setFlightDetails(response.data.data);

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch flight details. Please try again.");
      setLoading(false);
    }
  };

  // ✅ Handle Edit Click
  const handleEditClick = (index) => {
    setEditingPassenger(index);
    setEditedPassenger(flightDetails.passengersDetails[index]); // Load existing data
  };

  // ✅ Handle Edit Change
  const handleEditChange = (e) => {
    setEditedPassenger({ ...editedPassenger, [e.target.name]: e.target.value });
  };

  // ✅ Handle Update Passenger API Call
  const handleUpdatePassenger = async (index) => {
    console.log("index", index);
    console.log("indexed based id", flightDetails.passengersDetails[index].id);
    try {
      console.log("editedPassenger", editedPassenger);
      console.log("flightDetails", flightDetails);
      const response = await axios.put(
        `${apiUrl}update-passenger/${flightDetails.passengersDetails[index].id}`,
        editedPassenger,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "success") {
        alert("Passenger updated successfully!");
        fetchFlightDetails(); // ✅ Refresh data
        setEditingPassenger(null); // Exit edit mode
      } else {
        alert("Error updating passenger: " + response.data.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update passenger.");
    }
  };

  // ✅ Handle Delete Passenger API Call
  const handleDeletePassenger = async (passengerId) => {
    if (!window.confirm("Are you sure you want to delete this passenger?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `${apiUrl}delete-passenger/${passengerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Passenger deleted successfully!");
        fetchFlightDetails(); // ✅ Refresh data
        if (flightDetails.passengersDetails.length() === 0)
          navigate("/dashboard");
      } else {
        toast.error("Error deleting passenger: " + response.data.message);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete passenger.");
    }
  };

  if (loading)
    return <p className="text-center mt-6">Loading booking summary...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
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
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Passenger Details</h3>
        <div className="mt-2 bg-gray-50 p-4 rounded-m">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2">First Name</th>
                <th className="p-2">Last Name</th>
                <th className="p-2">Age</th>
                <th className="p-2">Gender</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flightDetails.passengersDetails.map((passenger, index) => (
                <tr key={index} className="border-b text-center">
                  {/* ✅ Edit Mode */}
                  {editingPassenger === index ? (
                    <>
                      <td className="p-2">
                        <input
                          type="text"
                          name="firstName"
                          value={editedPassenger.firstName}
                          onChange={handleEditChange}
                          className="border p-1 rounded"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          name="lastName"
                          value={editedPassenger.lastName}
                          onChange={handleEditChange}
                          className="border p-1 rounded"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          name="age"
                          value={editedPassenger.age}
                          onChange={handleEditChange}
                          className="border p-1 rounded"
                        />
                      </td>
                      <td className="p-2">
                        <select
                          name="gender"
                          value={editedPassenger.gender}
                          onChange={handleEditChange}
                          className="border p-1 rounded"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => handleUpdatePassenger(index)}
                          className="text-green-600 hover:text-green-800 mr-2"
                        >
                          ✅ Save
                        </button>
                        <button
                          onClick={() => setEditingPassenger(null)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ❌ Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      {/* ✅ Normal View Mode */}
                      <td className="p-2">{passenger.firstName}</td>
                      <td className="p-2">{passenger.lastName}</td>
                      <td className="p-2">{passenger.age}</td>
                      <td className="p-2">{passenger.gender}</td>
                      <td className="p-2 flex space-x-2 justify-center">
                        <button
                          onClick={() => handleEditClick(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeletePassenger(passenger.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
