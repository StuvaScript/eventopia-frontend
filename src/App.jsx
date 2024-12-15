import React, { useState, useEffect } from "react";
import { getData } from "./util/index";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import HomePage from "./pages/HomePage";

const city = "Seattle";
const stateCode = "WA";

// Ticketmaster search Url
const URL = `/api/v1/ticketmaster/events/${city}/${stateCode}`;

// Optional config
const config = {
  params: {
    startDateTime: "",
    endDateTime: "",
  },
};

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const myData = await getData(URL, config);
      // setMessage(myData.data);
      console.log(myData);
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
