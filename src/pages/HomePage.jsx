import * as React from "react";
import AppAppBar from "../components/Header";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { getData, postData } from "../util";

const HomePage = () => {
  return (
    <div>
      <AppAppBar />
      <Hero />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
