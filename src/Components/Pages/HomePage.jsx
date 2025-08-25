import React, { useEffect } from "react";
import Testimonials from "../Testimonials";
import EventGrid from "../EventGrid";
import { useAuth } from "../../context/AuthContext.jsx";

const HomePage = ({ setHeaderTitle }) => {
  const { user, token } = useAuth();
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
      {/* <EventGrid /> */}
      <EventGrid user={user} token={token} />
      <Testimonials />
    </div>
  );
};

export default HomePage;
