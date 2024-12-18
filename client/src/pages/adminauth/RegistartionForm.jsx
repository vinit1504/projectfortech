import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerAdmin } from "./../../api/api.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationFormCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target;
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());

    try {
      console.log("Submitting data: ", value);
      const response = await registerAdmin(value);

      console.log("Registration successful:", response);
      toast.success("Registration successful! You can now log in.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);

      form.reset();
    } catch (err) {
      console.error("Error registering user:", err);
      toast.error(err.message || "Email Id Already Exists.");
      setError(err.message || "Email Id Already Exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-5xl gap-y-4 md:gap-x-8">
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

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                name="email"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                name="password"
                required
              />
            </div>

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
                  <Link
                    to="/privacy-policy"
                    className="text-blue-400 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

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

        <div className="hidden md:flex w-full md:w-1/2 bg-gray-900 items-center justify-center">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
            alt="Illustration"
            className="h-auto w-full"
          />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default RegistrationFormCustomer;
