import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const FlightSearch = ({ onSearch, resetFields }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(null);
  const [passengers, setPassengers] = useState(null);

  const passengerOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Passenger${i > 0 ? "s" : ""}`,
  }));

  // ✅ Reset input fields when resetFields is triggered (after booking)
  useEffect(() => {
    if (resetFields) {
      setOrigin("");
      setDestination("");
      setDate(null);
      setPassengers(null);
    }
  }, [resetFields]);

  // ✅ Handle Date Selection & Format
  const handleDateChange = (selectedDate) => {
    setDate(formatDate(selectedDate));
  };

  // ✅ Format Date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ origin, destination, date, passengers });
  };

  // ✅ Enable button only if all fields are filled
  const isFormValid = origin && destination && date && passengers;

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl mb-6 max-w-5xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 items-center justify-between"
      >
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="p-3 border rounded-lg w-full sm:w-[18%] shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="p-3 border rounded-lg w-full sm:w-[18%] shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <div className="relative w-full sm:w-[18%]">
          <DatePicker
            selected={date ? new Date(date) : null}
            onChange={handleDateChange}
            placeholderText="Select Date"
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="w-full sm:w-[18%]">
          <Select
            options={passengerOptions}
            value={passengerOptions.find((opt) => opt.value === passengers)}
            onChange={(selected) => setPassengers(selected.value)}
            className="w-full text-gray-700"
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid} // ✅ Disable button if any field is empty
          className={`p-3 rounded-lg w-full sm:w-[18%] font-semibold shadow-md transition duration-300 ${
            isFormValid
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Search Flight
        </button>
      </form>
    </div>
  );
};

export default FlightSearch;
