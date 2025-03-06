// import { createContext, useContext, useState } from "react";

// // ✅ Create Context
// const FlightBookingContext = createContext();

// // ✅ Provider Component
// export const FlightBookingProvider = ({ children }) => {
//   const [flightDetails, setFlightDetails] = useState(null);
//   const [passengerDetails, setPassengerDetails] = useState([]);

//   // ✅ Save flight search data
//   const saveFlightDetails = (details) => {
//     setFlightDetails(details);
//     setPassengerDetails(
//       Array.from({ length: details.passengers }, () => ({
//         firstName: "",
//         lastName: "",
//         age: "",
//         gender: "",
//       }))
//     );
//   };

//   return (
//     <FlightBookingContext.Provider
//       value={{
//         flightDetails,
//         passengerDetails,
//         setPassengerDetails,
//         saveFlightDetails,
//       }}
//     >
//       {children}
//     </FlightBookingContext.Provider>
//   );
// };

// // ✅ Custom Hook
// export const useFlightBooking = () => useContext(FlightBookingContext);

import { createContext, useContext, useState } from "react";

const FlightBookingContext = createContext();

export const FlightBookingProvider = ({ children }) => {
  const [flightDetails, setFlightDetails] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  // ✅ Save Flight Search Data
  const saveFlightDetails = (details) => {
    setFlightDetails(details);
  };

  // ✅ Reset flight details (after booking)
  const resetFlightDetails = () => {
    setFlightDetails(null);
  };

  return (
    <FlightBookingContext.Provider
      value={{
        flightDetails,
        saveFlightDetails,
        resetFlightDetails,
        bookingId,
        setBookingId,
      }}
    >
      {children}
    </FlightBookingContext.Provider>
  );
};

export const useFlightBooking = () => useContext(FlightBookingContext);
