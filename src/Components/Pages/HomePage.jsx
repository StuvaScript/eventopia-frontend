import React, { useEffect } from "react";
import Testimonials from "../Testimonials";
import EventGrid from "../EventGrid";

const HomePage = ({ setHeaderTitle }) => {
  // console.log(setHeaderTitle);
  // useEffect(() => {
  //   setHeaderTitle(""); //Do we need Title on the home page?
  // }, [setHeaderTitle]);

  return (
    <div
      style={{
        paddingTop: "80px",
      }}
    >
      <EventGrid />
      <Testimonials />
    </div>
  );
};

export default HomePage;
