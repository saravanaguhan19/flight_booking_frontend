import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const FlightSearch = ({ onSearch }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(null);
  const [passengers, setPassengers] = useState(null);

  const passengerOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Passenger${i > 0 ? "s" : ""}`,
  }));
  
  const handleDateChange = (selectedDate) => {
    // Format the date as YYYY-MM-DD
    const formattedDate = formatDate(selectedDate);
    setDate(formattedDate);
  };

  // Function to format the date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();

    // Format to YYYY-MM-DD
    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ origin, destination, date, passengers });
  };

  // ✅ Check if all fields are filled before enabling the button
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
          {/* <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="Select Date"
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          /> */}
          <DatePicker
            selected={date ? new Date(date) : null}
            onChange={handleDateChange}
            placeholderText="Select Date"
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* <DatePicker
            selected={date}
            onChange={(date) => {
              // const formatedDate = formatDate(date);
              return setDate(date);
            }}
            placeholderText="Select Date"
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          /> */}
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
