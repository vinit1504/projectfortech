import axios from "axios";

// Function to register a customer
export const registerAdmin = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/v1/register/admin",
      formData
    );

    return response.data;
  } catch (error) {
    console.log("error", error);

    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/v1/login/admin",
      {
        email,
        password,
      }
    );
    return response.data; // This will contain the response from your backend
  } catch (error) {
    console.log("error", error);
    throw new Error(error.response?.data?.error || "");
  }
};

export const registerCustomer = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/v1/register/customer",
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
