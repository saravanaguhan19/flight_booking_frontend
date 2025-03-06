import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
// import BookingSummary from "./pages/BookingSummary";
import MyBookings from "./pages/MyBookings";

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* ✅ If token exists, redirect '/' to Dashboard */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />
          }
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/signin" />}
        />

        {/* <Route
          path="/booking-summary/:flightId"
          element={user ? <BookingSummary /> : <Navigate to="/signin" />}
        /> */}
        <Route
          path="/bookings"
          element={user ? <MyBookings /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signin"
          element={!user ? <SignIn /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/dashboard" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
