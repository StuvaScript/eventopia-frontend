import React, { useState, useEffect } from "react";
const URL = "http://localhost:8000/api/v1/";
import SignUp from "./components/authentication/SignUp";
import Login from "./components/authentication/Login";
import Forgot from "./components/authentication/ForgotPassword";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getAllData } from "./util/index";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import HomePage from "./pages/HomePage";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<Forgot />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
    //  <>
    //     <ThemeProvider theme={theme}>
    //       <CssBaseline />
    //       <HomePage />
    //     </ThemeProvider>
    //   </>
  );
}

export default App;
