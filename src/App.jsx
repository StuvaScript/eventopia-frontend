import React, { useState, useEffect } from "react";
const URL = "http://localhost:8000/api/v1/";
import SignUp from "./Component/Authentication/SignUp";
import Login from "./Component/Authentication/Login";
import Forgot from "./Component/Authentication/Forgot";
import Home from "./Component/Authentication/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
