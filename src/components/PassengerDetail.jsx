


import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useFlightBooking } from "../context/FlightBookingContext";
import axios from "axios";
import apiUrl from "../config";
import { motion } from "framer-motion";

const PassengerDetail = ({ onSubmit }) => {
  const { flightDetails, setBookingId, setBookingInProgress } =
    useFlightBooking();

  // ✅ Convert `passengers` into a valid array
  const passengerCount = Number(flightDetails?.passengers) || 1; // Ensure it's a number
  const passengersArray = Array.from({ length: passengerCount }, () => ({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  }));

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { passengers: passengersArray },
  });

  // ✅ Ensure `passengers` is set correctly on component mount
  useEffect(() => {
    setValue("passengers", passengersArray);
  }, [setValue, passengerCount, passengersArray]);

  const handlePassengerSubmit = async (data) => {
    const token = localStorage.getItem("token");
    setBookingInProgress(true); // ✅ Start booking loader

    try {
      const response = await axios.post(
        `${apiUrl}create-flight`,
        {
          origin: flightDetails.origin,
          destination: flightDetails.destination,
          date: flightDetails.date,
          passengersDetails: data.passengers,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        setBookingId(response.data.data.flight_id);
        onSubmit(response.data.data.flight_id);
      }
    } catch (error) {
      console.error("Failed to submit passenger details:", error);
    } finally {
      setBookingInProgress(false); // ✅ Stop booking loader
    }
  };

  if (!flightDetails) return null;

  return (
    <motion.div
      className=" p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl mb-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
        Enter Passenger Details ({passengerCount} passengers)
      </h3>
      <form
        onSubmit={handleSubmit(handlePassengerSubmit)}
        className="space-y-4"
      >
        {passengersArray.map((_, index) => (
          <div key={index} className="flex flex-wrap gap-4 items-center">
            {/* First Name */}
            <div className="w-full sm:w-[22%]">
              <Controller
                name={`passengers.${index}.firstName`}
                control={control}
                rules={{ required: "First name is required", minLength: 2 }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="First Name"
                    className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 dark:focus:ring-gray-600 focus:outline-none dark:bg-gray-700 dark:text-white"
                  />
                )}
              />
              {errors?.passengers?.[index]?.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.passengers[index].firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="w-full sm:w-[22%]">
              <Controller
                name={`passengers.${index}.lastName`}
                control={control}
                rules={{ required: "Last name is required", minLength: 2 }}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Last Name"
                    className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 dark:focus:ring-gray-600 focus:outline-none dark:bg-gray-700 dark:text-white"
                  />
                )}
              />
              {errors?.passengers?.[index]?.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.passengers[index].lastName.message}
                </p>
              )}
            </div>

            {/* Age */}
            <div className="w-full sm:w-[22%]">
              <Controller
                name={`passengers.${index}.age`}
                control={control}
                rules={{
                  required: "Age is required",
                  min: { value: 1, message: "Age must be greater than 0" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Age"
                    className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 dark:focus:ring-gray-600 focus:outline-none dark:bg-gray-700 dark:text-white"
                  />
                )}
              />
              {errors?.passengers?.[index]?.age && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.passengers[index].age.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="w-full sm:w-[22%]">
              <Controller
                name={`passengers.${index}.gender`}
                control={control}
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || ""} // ✅ Prevent `null` values
                    className="p-3 border rounded-lg w-full shadow-sm dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                )}
              />
              {errors?.passengers?.[index]?.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.passengers[index].gender.message}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg w-full font-semibold shadow-md transition duration-300 hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
        >
          Submit Passenger Details
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PassengerDetail;
