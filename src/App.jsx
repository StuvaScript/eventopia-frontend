import React, { useState, useEffect } from "react";
import { getData } from "./util/index";

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
      <h1>{message}</h1>
    </>
  );
}

export default App;
