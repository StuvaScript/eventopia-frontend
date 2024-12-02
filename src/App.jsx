import React, { useState, useEffect } from "react";
const URL = "http://localhost:8000/api/v1/";
import SignUp from "./Component/NavBar/SignUp";
import Login from "./Component/NavBar/Login";
import Forgot from "./Component/NavBar/Forgot";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
      </Routes>
    </div>
  );
}

export default App;
