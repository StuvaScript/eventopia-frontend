import React, { useState, useEffect } from "react";
import SignUp from "./Components/Authentication/SignUp";
import Login from "./Components/Authentication/Login";
import Forgot from "./Components/Authentication/ForgotPassword";
import ResetPassword from "./Components/Authentication/ResetPassword";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import EventResultPage from "./Components/Pages/EventResultPage";
import MyPlanner from "./Components/Pages/MyPlanner";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<Forgot />} />
            <Route
              path="/resetpassword/:resetToken"
              element={<ResetPassword />}
            />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/eventresult" element={<EventResultPage />} />
            <Route path="/myplanner" element={<MyPlanner />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
