// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import { useEffect } from "react";
// import { toast } from "react-toastify";

// // ✅ Define Zod validation schema
// const schema = z.object({
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// const SignIn = () => {
//   const { login } = useAuth(); // Use login function from AuthContext
//   const navigate = useNavigate();

//   useEffect(() => {
//     // ✅ Redirect if user is already logged in
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/dashboard");
//     }
//   }, []);

//   // ✅ Set up React Hook Form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(schema) });

//   const onSubmit = async (data) => {
//     const result = await login(data.email, data.password);

//     console.log("Login Result:", result);
//     if (result.success) {
//       // ✅ Save token & email in localStorage
//       // localStorage.setItem("token", result.token);
//       // localStorage.setItem("email", data.email);

//       // ✅ Redirect to dashboard after successful login
//       navigate("/dashboard");
//     } else {
//       toast.error(result.message);
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="w-96 bg-white p-6 shadow-md rounded-lg">
//           <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <input
//                 {...register("email")}
//                 className="w-full p-2 border rounded"
//                 placeholder="Email"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email.message}</p>
//               )}
//             </div>

//             <div>
//               <input
//                 {...register("password")}
//                 type="password"
//                 className="w-full p-2 border rounded"
//                 placeholder="Password"
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//             >
//               Login
//             </button>
//           </form>
//           <p className="text-center mt-4 text-gray-600">
//             Not a member?{" "}
//             <Link to="/signup" className="text-blue-500">
//               Sign Up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignIn;
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header"; // ✅ Import Header

// ✅ Define Zod validation schema
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <Header minimal={true} /> {/* ✅ Show only logo and theme toggle in header */}
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800 transition-colors">
        <div className="w-96 bg-white dark:bg-gray-900 p-6 shadow-md rounded-lg text-gray-800 dark:text-white">
          <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("email")}
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <input
                {...register("password")}
                type="password"
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
            Not a member? <Link to="/signup" className="text-blue-500 dark:text-blue-300">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;


