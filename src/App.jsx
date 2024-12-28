import React, { useState, useEffect } from "react";
const URL = "http://localhost:8000/api/v1/";
import SignUp from "./components/authentication/SignUp";
import Login from "./components/authentication/Login";
import Forgot from "./components/authentication/ForgotPassword";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getAllData } from "./util/index";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<Forgot />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
