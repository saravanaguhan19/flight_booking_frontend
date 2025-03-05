// FlightBookingContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Create the context
const FlightBookingContext = createContext();

// Create the provider component
export const FlightBookingProvider = ({ children }) => {
  const [flightDetails, setFlightDetails] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState([]);

  // Function to handle flight search submission
  const submitFlightSearch = (details) => {
    setFlightDetails(details);
  };

  // Function to handle passenger details submission
  const submitPassengerDetails = async (details) => {
    setPassengerDetails(details);

    // Combine flight and passenger details
    const bookingData = {
      flight: flightDetails,
      passengers: details,
    };

    try {
      // Send data to the backend API
      const response = await axios.post('YOUR_API_ENDPOINT', bookingData);
      console.log('Booking successful:', response.data);
      // Handle successful booking (e.g., navigate to a confirmation page)
    } catch (error) {
      console.error('Error during booking:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  return (
    <FlightBookingContext.Provider
      value={{ flightDetails, submitFlightSearch, submitPassengerDetails }}
    >
      {children}
    </FlightBookingContext.Provider>
  );
};

// Custom hook to use the FlightBookingContext
export const useFlightBooking = () => useContext(FlightBookingContext);
