import React, { useState, useEffect } from "react";
import SignUp from "./components/authentication/SignUp";
import Login from "./components/authentication/Login";
import Forgot from "./components/authentication/ForgotPassword";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { getAllData } from "./util/index";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      setMessage(myData.data);
    })();

    return () => {
      console.log("unmounting");
    };
  }, []);

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
    //  <>
    //     <ThemeProvider theme={theme}>
    //       <CssBaseline />
    //       <HomePage />
    //     </ThemeProvider>
    //   </>
  );
}

export default App;
