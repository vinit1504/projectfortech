/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { registerAdmin } from "./../../api/api.js"; // Import the API call from the api.js file
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const RegistrationFormCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    console.log("handlesubmit");
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous errors

    const form = e.target;
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());

    try {
      // Call the registerCustomer API function
      console.log("value", value);
      const response = await registerAdmin(value);
      console.log("Registration successful:", response);
      navigate('/login')

      // Reset the form after successful registration
      form.reset();
      
      // Show success toast
      toast.success("Registration successful! You can now log in.");

      // Redirect to login or dashboard page (optional)
    } catch (err) {
      console.error("Error registering user:", err.message);
      
      // Set error state and show error toast
      setError("Email Id Already Exits.");
      toast.error("Email Id Already Exits.");
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
            Create An Account As Admin
          </h2>
          <p className="text-gray-400 mb-6">
            Start your journey with us. Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login here.
            </Link>
          </p>

          <form onSubmit={handlesubmit}>
            {/* First Name and Last Name */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full md:w-1/2 p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                name="first_name"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full md:w-1/2 p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                name="last_name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                name="email"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                name="password"
                required
              />
            </div>

            {/* Checkbox and Terms */}
            <div className="mt-4 text-gray-400">
              <label className="inline-flex items-start">
                <input
                  type="checkbox"
                  className="form-checkbox bg-gray-700 text-blue-500 focus:ring-0"
                  required
                />
                <span className="ml-2">
                  By signing up, you agree to the{" "}
                  <Link to="/terms" className="text-blue-400 hover:underline">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy" className="text-blue-400 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 p-3 text-center bg-blue-600 rounded-lg text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create an account"}
            </button>
          </form>

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

export default RegistrationFormCustomer;
