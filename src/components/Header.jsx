import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleBookings = () => {
    console.log("clicked my bookings");
    navigate("/bookings");
  };

  return (
    <header className="flex justify-between items-center  p-4 text-white shadow-xl">
      {/* ✅ Logo on the left */}
      <div
        className="text-xl font-bold cursor-pointer w-44"
        onClick={handleBookings}
      >
        <img
          src="https://d12lchh0gjjhot.cloudfront.net/qa/uploadFiles/portalLogo/414_1729072841_portal_logo.svg"
          alt=""
        />
      </div>

      {/* ✅ User Info & Logout on the right */}
      {user && (
        <div className="flex items-center gap-4">
          <div
            onClick={() => navigate("/")}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            my bookings
          </div>
          {/* ✅ Round div with first letter of email */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100  text-black font-bold">
            {user.email.charAt(0).toUpperCase()}
          </div>

          {/* ✅ Logout button */}
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
