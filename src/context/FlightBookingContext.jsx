import { createContext, useContext, useState } from "react";

const FlightBookingContext = createContext();

export const FlightBookingProvider = ({ children }) => {
  const [flightDetails, setFlightDetails] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  return (
    <FlightBookingContext.Provider
      value={{
        flightDetails,
        setFlightDetails,
        bookingId,
        setBookingId,
        bookingInProgress,
        setBookingInProgress,
      }}
    >
      {children}
    </FlightBookingContext.Provider>
  );
};

// Custom Hook for easier access
export const useFlightBooking = () => useContext(FlightBookingContext);
