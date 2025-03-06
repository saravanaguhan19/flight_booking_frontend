import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FlightSearch from "../components/FlightSearch";
import PassengerDetail from "../components/PassengerDetail";
import BookingSummary from "../components/BookingSummary";
import Header from "../components/Header";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [flightDetails, setFlightDetails] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [showBookingProgress, setShowBookingProgress] = useState(false);
  const [showBookingSummary, setShowBookingSummary] = useState(false);

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);

  if (!user) return null;

  const handleFlightSearch = (details) => {
    setFlightDetails(details);
    setShowBookingSummary(false);
  };

  const handlePassengerSubmit = (createdBookingId) => {
    setFlightDetails(null); // ✅ Hide Passenger Form First
    setShowBookingProgress(true); // ✅ Start Showing "Booking in Progress"

    setTimeout(() => {
      setShowBookingProgress(false);
      setBookingId(createdBookingId);
      setShowBookingSummary(true);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <div className="max-w-4xl mx-auto py-10 px-6">
        <motion.h2
          className="text-3xl font-semibold text-indigo-500 text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ✈️ Welcome, {user.email.split("@")[0]}!
        </motion.h2>

        <motion.div
          className="bg-white p-6 shadow-xl rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <FlightSearch
            onSearch={handleFlightSearch}
            resetFields={showBookingProgress}
          />
        </motion.div>

        {flightDetails && !showBookingProgress && (
          <motion.div
            className="mt-6 bg-white p-6 shadow-xl rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PassengerDetail
              flightDetails={flightDetails}
              onSubmit={handlePassengerSubmit}
            />
          </motion.div>
        )}

        {showBookingProgress && (
          <motion.div
            className="flex flex-col items-center py-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            <p className="mt-4 text-lg font-semibold text-blue-600">
              Booking in progress...
            </p>
          </motion.div>
        )}

        {showBookingSummary && (
          <motion.div
            className="mt-6 bg-white p-6 shadow-xl rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BookingSummary flightId={bookingId} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

//2222222222222222222222222222222222222

// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useFlightBooking } from "../context/FlightBookingContext";
// import FlightSearch from "../components/FlightSearch";
// import PassengerDetail from "../components/PassengerDetail";
// import BookingSummary from "../components/BookingSummary";
// import Header from "../components/Header";
// import { motion } from "framer-motion";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const {
//     flightDetails,
//     saveFlightDetails,
//     bookingId,
//     setBookingId,
//     resetFlightDetails,
//   } = useFlightBooking();

//   const [showBookingProgress, setShowBookingProgress] = useState(false);
//   const [showBookingSummary, setShowBookingSummary] = useState(false);

//   useEffect(() => {
//     if (!user) navigate("/signin");
//   }, [user, navigate]);

//   if (!user) return null;

//   // ✅ Handle flight search & reset summary
//   const handleFlightSearch = (details) => {
//     saveFlightDetails(details);
//     setShowBookingSummary(false);
//   };

//   // ✅ Handle passenger submission & show progress animation
//   const handlePassengerSubmit = (createdBookingId) => {
//     resetFlightDetails(); // ✅ Hide Passenger Form First
//     setShowBookingProgress(true); // ✅ Start Showing "Booking in Progress"

//     setTimeout(() => {
//       setShowBookingProgress(false);
//       setBookingId(createdBookingId);
//       setShowBookingSummary(true);
//     }, 5000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <Header />

//       <div className="max-w-4xl mx-auto py-10 px-6">
//         <motion.h2
//           className="text-3xl font-semibold text-sky-400 text-center mb-6"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           ✈️ Welcome, {user.email.split("@")[0]}!
//         </motion.h2>

//         <motion.div
//           className="bg-white p-6 shadow-xl rounded-lg"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           <FlightSearch />
//         </motion.div>

//         {flightDetails && !showBookingProgress && (
//           <motion.div
//             className="mt-6 bg-white p-6 shadow-xl rounded-lg"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <PassengerDetail onSubmit={handlePassengerSubmit} />
//           </motion.div>
//         )}

//         {showBookingProgress && (
//           <motion.div
//             className="flex flex-col items-center py-6"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//             <p className="mt-4 text-lg font-semibold text-blue-600">
//               Booking in progress...
//             </p>
//           </motion.div>
//         )}

//         {showBookingSummary && bookingId && (
//           <motion.div
//             className="mt-6 bg-white p-6 shadow-xl rounded-lg"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <BookingSummary />
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
