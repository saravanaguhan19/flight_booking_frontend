// export default PassengerDetail;
// import React, { useState, useEffect } from "react";

// const PassengerDetail = ({ flightDetails }) => {
//   const [passengers, setPassengers] = useState([]);

//   useEffect(() => {
//     if (flightDetails) {
//       setPassengers(
//         Array.from({ length: flightDetails.passengers }, () => ({
//           firstName: "",
//           lastName: "",
//           age: "",
//           gender: "",
//         }))
//       );
//     }
//   }, [flightDetails]);

//   const handleChange = (index, field, value) => {
//     const updatedPassengers = passengers.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengers(updatedPassengers);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Passenger Details:", passengers);
//   };

//   if (!flightDetails) return null;

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-2xl mb-6 max-w-4xl mx-auto w-full">
//       <h3 className="text-lg font-semibold mb-4">
//         Enter Passenger Details ({flightDetails.passengers} passengers)
//       </h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {passengers.map((passenger, index) => (
//           <div key={index} className="flex flex-wrap gap-4 items-center">
//             <input
//               type="text"
//               placeholder="First Name"
//               value={passenger.firstName}
//               onChange={(e) => handleChange(index, "firstName", e.target.value)}
//               className="p-3 border rounded-lg w-full sm:w-[22%] shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               value={passenger.lastName}
//               onChange={(e) => handleChange(index, "lastName", e.target.value)}
//               className="p-3 border rounded-lg w-full sm:w-[22%] shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Age"
//               value={passenger.age}
//               onChange={(e) => handleChange(index, "age", e.target.value)}
//               className="p-3 border rounded-lg w-full sm:w-[22%] shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//               min="0"
//             />
//             <select
//               value={passenger.gender}
//               onChange={(e) => handleChange(index, "gender", e.target.value)}
//               className="p-3 border rounded-lg w-full sm:w-[22%] shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//             >
//               <option value="" disabled>
//                 Gender
//               </option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//         ))}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white p-3 rounded-lg w-full font-semibold shadow-md hover:bg-blue-700 transition duration-300"
//         >
//           Submit Passenger Details
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PassengerDetail;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PassengerDetail = ({ flightDetails }) => {
  console.log(flightDetails);
  const [passengers, setPassengers] = useState([]);
  const navigate = useNavigate();

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

    console.log(updatedPassengers);
    setPassengers(updatedPassengers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Create the payload exactly as required
    const payload = {
      origin: flightDetails.origin,
      destination: flightDetails.destination,
      date: flightDetails.date,
      passengersDetails: passengers, // ✅ Matches the correct key
    };
    console.log(passengers);
    console.log(payload);
    try {
      // console.log(payload);
      const response = await axios.post(
        "http://172.17.2.66:8000/create-flight",

        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(`Bearer ${localStorage.getItem("token")}`);
      console.log("Server Response:", response.data);

      if (response.data.status === "success") {
        toast.success("Flight and Passenger details saved successfully!");
        // navigate(`/booking-summary/${response.data.data.flight_id}`);
        navigate("/bookings");
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to save details. Please try again.");
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
