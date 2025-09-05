import React, { useEffect } from "react";
import Testimonials from "../Testimonials";
import EventGrid from "../EventGrid";
import { useAuth } from "../../context/AuthContext.jsx";

const HomePage = ({}) => {
  const { user, token } = useAuth();

  return (
    <div
      style={{
        paddingTop: "80px",
      }}
    >
      <EventGrid user={user} token={token} />
      <Testimonials />
    </div>
  );
};

export default HomePage;
