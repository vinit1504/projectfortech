/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom"; // Import Routes and Route
import RegistrationForm from "./pages/adminauth/RegistartionForm";
import RegistrationFormCustomer from "./pages/customerauth/RegistrationFormCustomer"; // Import RegistrationFormCustomer
import LoginForm from "./pages/adminauth/LoginForm"; // Import LoginForm
import DashBoard from "./pages/DashBoard";

const App = () => {
  return (
    <Routes>
      {/* Define routes for the pages */}
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/register-customer" element={<RegistrationFormCustomer />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path='/dashboard' element={<DashBoard/>}/>
    </Routes>
  );
};

export default App;
