

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FlightSearch from "../components/FlightSearch";
import PassengerDetail from "../components/PassengerDetail";
import Header from "../components/Header";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [flightDetails, setFlightDetails] = useState(null);

  useEffect(() => {
    if (!user) navigate("/signin"); // Redirect if not logged in
  }, [user, navigate]);

  if (!user) return null; // Prevent rendering if user is null

  // ✅ Handles Flight Search Submission
  const handleFlightSearch = (details) => {
    setFlightDetails(details); // Store flight details including passenger count
    console.log(flightDetails);
  };

  return (
    <div>
      <Header />
      <div className="p-4">
        <h2 className="text-xl font-bold p-4">Welcome, {user.username}</h2>

        {/* ✅ Flight Search Component */}
        <FlightSearch onSearch={handleFlightSearch} />

        {/* ✅ Render Passenger Details only when flight details exist */}
        {flightDetails && <PassengerDetail flightDetails={flightDetails} />}
      </div>
    </div>
  );
};

export default Dashboard;
