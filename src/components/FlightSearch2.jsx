// FlightSearchForm.js
import React, { useState } from "react";
import { useFlightBooking } from "../context/FlightBookingContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const FlightSearch = () => {
  const { submitFlightSearch } = useFlightBooking();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(null);
  const [passengers, setPassengers] = useState(1);

  const passengerOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Passenger${i > 0 ? "s" : ""}`,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFlightSearch({ origin, destination, date, passengers });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl mb-6 max-w-4xl mx-auto w-full">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
      >
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          placeholderText="Select Date"
          className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <Select
          options={passengerOptions}
          value={passengerOptions.find((opt) => opt.value === passengers)}
          onChange={(selected) => setPassengers(selected.value)}
          className="w-full text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg w-full md:col-span-1 font-semibold shadow-md hover:bg-blue-700 transition duration-300"
        >
          Search Flight
        </button>
      </form>
    </div>
  );
};

export default FlightSearch;
