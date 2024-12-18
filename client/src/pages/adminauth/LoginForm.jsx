/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { FaGoogle } from "react-icons/fa"; // Import Google icon from react-icons
import { loginUser } from "./../../api/api.js"; // Import the API functions
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(true);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous errors

    const form = e.target;
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());

    try {
      // Call the loginUser API function
      const response = await loginUser(value.email, value.password);
      console.log("Login successful:", response);
      navigate("/dashboard");

      // Show success toast
      toast.success("Login successful! Redirecting...");

      // Handle successful login (e.g., store token in localStorage, redirect)
      form.reset(); // Reset form fields
      // Redirect to another page (optional)
    } catch (err) {
      console.error("Error logging in:", err.message)
      setError(err.message); // Set error state

      // Show error toast
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      {/* Card Container */}
      <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-5xl gap-y-4 md:gap-x-8">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Login To Your Account
          </h2>
          <p className="text-gray-400 mb-6 ">
            Don&apos;t have an account?{" "}<p></p>
            <Link to="/" className="text-blue-400 hover:underline">
              Sign Up As Admin
            </Link>
            <span className="mx-2">Or</span>
            <Link to="/register-customer" className="text-blue-400 hover:underline">
              Sign Up As Customer
            </Link>
          </p>

          <form onSubmit={handlesubmit}>
            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                name="email"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                name="password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 p-3 text-center bg-blue-600 rounded-lg text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Google Login Button */}
          <div className="mt-6">
            <button
              className="w-full p-3 text-center bg-red-600 rounded-lg text-white hover:bg-red-700 flex items-center justify-center gap-x-3"
            >
              <FaGoogle size={20} /> {/* Google Icon */}
              Login with Google
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Right Section - Illustration */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gray-900 items-center justify-center">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
            alt="Illustration"
            className="h-auto w-full"
          />
        </div>
      </div>

      {/* Toast Container to display the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
