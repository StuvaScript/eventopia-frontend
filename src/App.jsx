import React, { useState, useEffect } from "react";
import { getAllData } from "./util/index";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import HomePage from "./pages/HomePage";

// const URL = "http://localhost:8000/api/v1/";
const URL = "/api/v1/";

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
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HomePage />
      </ThemeProvider>
    </>
  );
}

export default App;
