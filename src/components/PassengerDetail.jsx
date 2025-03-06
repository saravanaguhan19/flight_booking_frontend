import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import apiUrl from "../config";

const PassengerDetail = ({ flightDetails, onSubmit }) => {
  const [passengers, setPassengers] = useState([]);

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
    setPassengers(updatedPassengers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Create the correct payload format
    const payload = {
      origin: flightDetails.origin,
      destination: flightDetails.destination,
      date: flightDetails.date,
      passengersDetails: passengers,
    };

    try {
      const response = await axios.post(`${apiUrl}create-flight`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.status === "success") {
        toast.success("Flight booked successfully!");
        onSubmit(response.data.data.flight_id); // ✅ Trigger Dashboard to handle loading
      } else {
        toast.error("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to save details. Please try again.");
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

//22222222222222222222222222222222222

// import { useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { toast } from "react-toastify";
// import apiUrl from "../config";

// const passengerSchema = z.object({
//   firstName: z.string().min(2, "First name must be at least 2 characters"),
//   lastName: z.string().min(2, "Last name must be at least 2 characters"),
//   age: z
//     .number({ invalid_type_error: "Age must be a number" })
//     .min(1, "Age must be at least 1"),
//   gender: z.enum(["male", "female", "other"], {
//     errorMap: () => ({ message: "Please select a gender" }),
//   }),
// });

// const flightSchema = z.object({
//   passengersDetails: z.array(passengerSchema),
// });

// const PassengerDetail = ({ flightDetails, onSubmit }) => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(flightSchema),
//     defaultValues: {
//       passengersDetails: [],
//     },
//   });

//   const { fields } = useFieldArray({
//     control,
//     name: "passengersDetails",
//   });

//   useEffect(() => {
//     if (flightDetails) {
//       const passengersArray = Array.from(
//         { length: flightDetails.passengers },
//         () => ({
//           firstName: "",
//           lastName: "",
//           age: "",
//           gender: "",
//         })
//       );
//       setValue("passengersDetails", passengersArray);
//     }
//   }, [flightDetails, setValue]);

//   const onSubmitForm = async (data) => {
//     const payload = {
//       origin: flightDetails.origin,
//       destination: flightDetails.destination,
//       date: flightDetails.date,
//       passengersDetails: data.passengersDetails,
//     };

//     try {
//       const response = await axios.post(`${apiUrl}create-flight`, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (response.data.status === "success") {
//         toast.success("Flight booked successfully!");
//         onSubmit(response.data.data.flight_id);
//       } else {
//         toast.error("Error: " + response.data.message);
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       toast.error("Failed to save details. Please try again.");
//     }
//   };

//   if (!flightDetails) return null;

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-2xl mb-6 max-w-4xl mx-auto w-full">
//       <h3 className="text-lg font-semibold mb-4">
//         Enter Passenger Details ({flightDetails.passengers} passengers)
//       </h3>

//       <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
//         {fields.map((field, index) => (
//           <div key={field.id} className="flex flex-wrap gap-4 items-center">
//             <div className="w-full sm:w-[22%]">
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 {...register(`passengersDetails.${index}.firstName`)}
//                 className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               />
//               {errors.passengersDetails?.[index]?.firstName && (
//                 <p className="text-red-500 text-sm">
//                   {errors.passengersDetails[index].firstName.message}
//                 </p>
//               )}
//             </div>

//             <div className="w-full sm:w-[22%]">
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 {...register(`passengersDetails.${index}.lastName`)}
//                 className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               />
//               {errors.passengersDetails?.[index]?.lastName && (
//                 <p className="text-red-500 text-sm">
//                   {errors.passengersDetails[index].lastName.message}
//                 </p>
//               )}
//             </div>

//             <div className="w-full sm:w-[22%]">
//               <input
//                 type="number"
//                 placeholder="Age"
//                 {...register(`passengersDetails.${index}.age`, {
//                   valueAsNumber: true,
//                 })}
//                 className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               />
//               {errors.passengersDetails?.[index]?.age && (
//                 <p className="text-red-500 text-sm">
//                   {errors.passengersDetails[index].age.message}
//                 </p>
//               )}
//             </div>

//             <div className="w-full sm:w-[22%]">
//               <select
//                 {...register(`passengersDetails.${index}.gender`)}
//                 className="p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               >
//                 <option value="" disabled>
//                   Gender
//                 </option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//               {errors.passengersDetails?.[index]?.gender && (
//                 <p className="text-red-500 text-sm">
//                   {errors.passengersDetails[index].gender.message}
//                 </p>
//               )}
//             </div>
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

//333333333333333333333333

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useFlightBooking } from "../context/FlightBookingContext";
// import apiUrl from "../config";

// const PassengerDetail = ({ onSubmit }) => {
//   const { flightDetails, passengerDetails, setPassengerDetails } =
//     useFlightBooking();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (flightDetails) {
//       setPassengerDetails(
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
//     const updatedPassengers = passengerDetails.map((passenger, i) =>
//       i === index ? { ...passenger, [field]: value } : passenger
//     );
//     setPassengerDetails(updatedPassengers);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const payload = {
//       origin: flightDetails.origin,
//       destination: flightDetails.destination,
//       date: flightDetails.date,
//       passengersDetails: passengerDetails,
//     };

//     try {
//       const response = await axios.post(`${apiUrl}create-flight`, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (response.data.status === "success") {
//         toast.success("Flight booked successfully!");
//         setTimeout(() => {
//           setLoading(false);
//           onSubmit(response.data.data.flight_id);
//         }, 5000);
//       } else {
//         toast.error("Error: " + response.data.message);
//         setLoading(false);
//       }
//     } catch (error) {
//       toast.error("Failed to save details. Please try again.");
//       setLoading(false);
//     }
//   };

//   if (!flightDetails) return null;

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-2xl mb-6 max-w-4xl mx-auto w-full">
//       <h3 className="text-lg font-semibold mb-4">
//         Enter Passenger Details ({flightDetails.passengers} passengers)
//       </h3>

//       {loading ? (
//         <div className="flex flex-col items-center py-6">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//           <p className="mt-4 text-lg font-semibold text-blue-600">
//             Booking in progress...
//           </p>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {passengerDetails.map((passenger, index) => (
//             <div key={index} className="flex flex-wrap gap-4 items-center">
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={passenger.firstName}
//                 onChange={(e) =>
//                   handleChange(index, "firstName", e.target.value)
//                 }
//                 className="p-3 border rounded-lg w-full sm:w-[22%]"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 value={passenger.lastName}
//                 onChange={(e) =>
//                   handleChange(index, "lastName", e.target.value)
//                 }
//                 className="p-3 border rounded-lg w-full sm:w-[22%]"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Age"
//                 value={passenger.age}
//                 onChange={(e) => handleChange(index, "age", e.target.value)}
//                 className="p-3 border rounded-lg w-full sm:w-[22%]"
//                 required
//                 min="0"
//               />
//             </div>
//           ))}
//           <button
//             type="submit"
//             className="bg-blue-600 text-white p-3 rounded-lg w-full"
//           >
//             Submit Passenger Details
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default PassengerDetail;
