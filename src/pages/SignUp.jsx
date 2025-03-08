// import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import apiUrl from "../config";
import Header from "../components/Header"; // ✅ Import Header for minimal mode
import { useForm } from "react-hook-form";

// ✅ Define Zod validation schema
const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUp = () => {
  const navigate = useNavigate();

  // ✅ Set up React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${apiUrl}register`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Server Response:", response.data);

      if (response.data.status === "success") {
        toast.success("Signup successful! Please log in.");
        navigate("/signin"); // ✅ Redirect to SignIn page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Signup Error:",
        error.response?.data?.message || error.message
      );
      toast.error(
        error.response?.data?.message || "Signup failed! Please try again."
      );
    }
  };

  return (
    <>
      {/* ✅ Minimal Header with Logo */}
      <Header minimal />

      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-96 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("username")}
                className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("email")}
                type="email"
                className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("password")}
                type="password"
                className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
            Already a member?{" "}
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
