import { useForm, Controller } from "react-hook-form";
import { useFlightBooking } from "../context/FlightBookingContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { motion } from "framer-motion";
import { useEffect } from "react";

const FlightSearch = () => {
  const { setFlightDetails, bookingInProgress } = useFlightBooking();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      origin: "",
      destination: "",
      date: null,
      passengers: null,
    },
  });

  useEffect(() => {
    if (bookingInProgress) {
      reset();
    }
  }, [bookingInProgress, reset]);

  const onSubmit = (data) => {
    setFlightDetails({
      ...data,
      passengers: Number(data.passengers) || 1, // Ensure it's a valid number
    });
  };

  return (
    <motion.div
      className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl max-w-4xl mx-auto mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 text-center mb-6">
        ✈️ Search for a Flight
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Origin */}
          <div className="relative">
            <Controller
              name="origin"
              control={control}
              rules={{ required: "Origin is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Origin"
                  className={`p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:outline-none ${
                    errors.origin
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-blue-400 dark:border-gray-600 dark:focus:ring-gray-600 dark:bg-gray-700 dark:text-white"
                  }`}
                />
              )}
            />
            {errors.origin && (
              <p className="text-red-500 text-xs mt-1 absolute">
                {errors.origin.message}
              </p>
            )}
          </div>

          {/* Destination */}
          <div className="relative">
            <Controller
              name="destination"
              control={control}
              rules={{ required: "Destination is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Destination"
                  className={`p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:outline-none ${
                    errors.destination
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-blue-400 dark:border-gray-600 dark:focus:ring-gray-600 dark:bg-gray-700 dark:text-white"
                  }`}
                />
              )}
            />
            {errors.destination && (
              <p className="text-red-500 text-xs mt-1 absolute">
                {errors.destination.message}
              </p>
            )}
          </div>

          {/* Date Picker */}
          <div className="relative">
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  placeholderText="Select Date"
                  className={`p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:outline-none ${
                    errors.date
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-blue-400 dark:border-gray-600 dark:focus:ring-gray-600 dark:bg-gray-700 dark:text-white"
                  }`}
                />
              )}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1 absolute">
                {errors.date.message}
              </p>
            )}
          </div>

          {/* Passenger Count */}
          <div className="relative">
            <Controller
              name="passengers"
              control={control}
              rules={{ required: "Passenger count is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  className={`p-3 border rounded-lg w-full sm:w-[22%] shadow-sm focus:ring-2 focus:ring-blue-400 
        dark:focus:ring-gray-600 focus:outline-none bg-white dark:bg-gray-700 text-black dark:text-white`}
                >
                  <option value="">Select Passengers</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} Passenger{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.passengers && (
              <p className="text-red-500 text-xs mt-1 absolute">
                {errors.passengers.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button with Extra Space */}
        <div className="mt-8">
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg font-semibold shadow-md transition duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-blue-800 flex items-center justify-center gap-2"
          >
            🚀 Search Flight
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default FlightSearch;

