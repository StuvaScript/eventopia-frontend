import React, { useState, useEffect } from "react";
import { getAllData } from "./util/index";
import axios from "axios";

const city = "Seattle";
const stateCode = "WA";
const startDate = "";
const endDate = "2025-02-22";

// const URL = "/api/v1/";
const URL = `/api/events/${city}/${stateCode}/${startDate}/${endDate}`;

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      // setMessage(myData.data);
      console.log(myData);
    })();

    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <>
      <h1>{message}</h1>
    </>
  );
}

export default App;
