import React, { useEffect } from "react";
import Hero from "../Hero";
import Testimonials from "../Testimonials";

const HomePage = ({ setHeaderTitle }) => {
  // console.log(setHeaderTitle);
  // useEffect(() => {
  //   setHeaderTitle(""); //Do we need Title on the home page?
  // }, [setHeaderTitle]);

  return (
    <div>
      <Hero />
      <Testimonials />
    </div>
  );
};

export default HomePage;
