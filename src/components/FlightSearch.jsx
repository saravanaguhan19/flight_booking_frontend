// import { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Select from "react-select";

// const FlightSearch = ({ onSearch, resetFields }) => {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [date, setDate] = useState(null);
//   const [passengers, setPassengers] = useState(null);

//   const passengerOptions = Array.from({ length: 10 }, (_, i) => ({
//     value: i + 1,
//     label: `${i + 1} Passenger${i > 0 ? "s" : ""}`,
//   }));

//   // ✅ Reset input fields when resetFields is triggered (after booking)
//   useEffect(() => {
//     if (resetFields) {
//       setOrigin("");
//       setDestination("");
//       setDate(null);
//       setPassengers(null);
//     }
//   }, [resetFields]);

//   // ✅ Handle Date Selection & Format
//   const handleDateChange = (selectedDate) => {
//     setDate(formatDate(selectedDate));
//   };

//   // ✅ Format Date to YYYY-MM-DD
//   const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1;
//     const day = date.getDate();
//     return `${year}-${month < 10 ? "0" + month : month}-${
//       day < 10 ? "0" + day : day
//     }`;
//   };

//   // ✅ Handle Form Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSearch({ origin, destination, date, passengers });
//   };

//   // ✅ Enable button only if all fields are filled
//   const isFormValid = origin && destination && date && passengers;

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-2xl mb-6 max-w-5xl mx-auto">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-wrap gap-4 items-center justify-between"
//       >
//         <input
//           type="text"
//           placeholder="Origin"
//           value={origin}
//           onChange={(e) => setOrigin(e.target.value)}
//           className="p-3 border rounded-lg w-full sm:w-[18%] shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//         />
//         <input
//           type="text"
//           placeholder="Destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           className="p-3 border rounded-lg w-full sm:w-[18%] shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//         />
//         <div className="relative w-full sm:w-[18%]">
//           <DatePicker
//             selected={date ? new Date(date) : null}
//             onChange={handleDateChange}
//             placeholderText="Select Date"
//             className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//         </div>
//         <div className="w-full sm:w-[18%]">
//           <Select
//             options={passengerOptions}
//             value={passengerOptions.find((opt) => opt.value === passengers)}
//             onChange={(selected) => setPassengers(selected.value)}
//             className="w-full text-gray-700"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={!isFormValid} // ✅ Disable button if any field is empty
//           className={`p-3 rounded-lg w-full sm:w-[18%] font-semibold shadow-md transition duration-300 ${
//             isFormValid
//               ? "bg-blue-600 text-white hover:bg-blue-700"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           Search Flight
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FlightSearch;

//22222222222222222222222222222222

// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Select from "react-select";

// const passengerOptions = Array.from({ length: 10 }, (_, i) => ({
//   value: i + 1,
//   label: `${i + 1} Passenger${i > 0 ? "s" : ""}`,
// }));

// // ✅ Zod Schema for Validation
// const flightSchema = z.object({
//   origin: z.string().min(3, "Origin must be at least 3 characters"),
//   destination: z.string().min(3, "Destination must be at least 3 characters"),
//   date: z.string().min(10, "Please select a valid date"),
//   passengers: z.number().min(1, "At least 1 passenger is required"),
// });

// const FlightSearch = ({ onSearch, resetFields }) => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(flightSchema),
//     defaultValues: {
//       origin: "",
//       destination: "",
//       date: "",
//       passengers: null,
//     },
//   });

//   // ✅ Watch form values to update UI accordingly
//   const formValues = watch();

//   // ✅ Reset input fields when resetFields is triggered (after booking)
//   useEffect(() => {
//     if (resetFields) {
//       reset();
//     }
//   }, [resetFields, reset]);

//   // ✅ Handle Date Selection & Format
//   const handleDateChange = (selectedDate) => {
//     if (selectedDate) {
//       const formattedDate = formatDate(selectedDate);
//       setValue("date", formattedDate);
//     }
//   };

//   // ✅ Format Date to YYYY-MM-DD
//   const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1;
//     const day = date.getDate();
//     return `${year}-${month < 10 ? "0" + month : month}-${
//       day < 10 ? "0" + day : day
//     }`;
//   };

//   // ✅ Handle Form Submission
//   const onSubmit = (data) => {
//     onSearch(data);
//   };

//   // ✅ Enable button only if all fields are filled
//   const isFormValid =
//     formValues.origin &&
//     formValues.destination &&
//     formValues.date &&
//     formValues.passengers;

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-2xl mb-6 max-w-5xl mx-auto">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-wrap gap-4 items-center justify-between"
//       >
//         <div className="w-full sm:w-[18%]">
//           <input
//             type="text"
//             placeholder="Origin"
//             {...register("origin")}
//             className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           {errors.origin && (
//             <p className="text-red-500 text-sm">{errors.origin.message}</p>
//           )}
//         </div>

//         <div className="w-full sm:w-[18%]">
//           <input
//             type="text"
//             placeholder="Destination"
//             {...register("destination")}
//             className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           {errors.destination && (
//             <p className="text-red-500 text-sm">{errors.destination.message}</p>
//           )}
//         </div>

//         <div className="relative w-full sm:w-[18%]">
//           <DatePicker
//             selected={formValues.date ? new Date(formValues.date) : null}
//             onChange={handleDateChange}
//             placeholderText="Select Date"
//             className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           {errors.date && (
//             <p className="text-red-500 text-sm">{errors.date.message}</p>
//           )}
//         </div>

//         <div className="w-full sm:w-[18%]">
//           <Select
//             options={passengerOptions}
//             value={passengerOptions.find(
//               (opt) => opt.value === formValues.passengers
//             )}
//             onChange={(selected) => setValue("passengers", selected.value)}
//             className="w-full text-gray-700"
//           />
//           {errors.passengers && (
//             <p className="text-red-500 text-sm">{errors.passengers.message}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={!isFormValid} // ✅ Disable button if any field is empty
//           className={`p-3 rounded-lg w-full sm:w-[18%] font-semibold shadow-md transition duration-300 ${
//             isFormValid
//               ? "bg-blue-600 text-white hover:bg-blue-700"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           Search Flight
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FlightSearch;

//33333333333333333333333333333333333

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useFlightBooking } from "../context/FlightBookingContext";

const FlightSearch = () => {
  const { saveFlightDetails } = useFlightBooking();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(null);
  const [passengers, setPassengers] = useState(null);

  const passengerOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Passenger${i > 0 ? "s" : ""}`,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    saveFlightDetails({ origin, destination, date, passengers });
  };

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
          className="p-3 border rounded-lg w-full sm:w-[18%]"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="p-3 border rounded-lg w-full sm:w-[18%]"
        />
        <div className="relative w-full sm:w-[18%]">
          <DatePicker
            selected={date}
            onChange={(selectedDate) => setDate(selectedDate)}
            placeholderText="Select Date"
            className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            wrapperClassName="w-full"
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
          className="bg-blue-600 text-white p-3 rounded-lg w-full sm:w-[18%]"
        >
          Search Flight
        </button>
      </form>
    </div>
  );
};

export default FlightSearch;
