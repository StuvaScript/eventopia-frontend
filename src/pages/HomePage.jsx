import * as React from "react";
import AppAppBar from "../components/Header";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { getData, postData } from "../util";

// User login Url
// const URL = `/api/v1/user/login`;

//  login requestBody example
// const requestBody = {
//   email: "jb100@gmail.com",
//   password: "Password129",
// };

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxZTRiMTEyZGQ2OTllYjcwOGRkMDkiLCJmaXJzdE5hbWUiOiJKaW0iLCJsYXN0TmFtZSI6IkJyb3duIiwiaWF0IjoxNzM0NDcxNzE0LCJleHAiOjE3MzQ1NTgxMTR9.e5GYCVGUA-hg2_W7QdMsfqNMVXcgRJJcxy4P_5BjCB4";

// Itinerary Url
const URL = `/api/v1/itinerary`;

//  Itinerary requestBody example
const requestBody = {
  name: "Event name",
  date: "2024-12-29",
  location: {
    address: "6780 main St",
    city: "NY",
    state: "NY",
    postalCode: "11364",
    coordinates: {
      lat: 5,
      lng: 5,
    },
  },
  user: "675bb5d8277e1a64f2033539",
};

// Fetch code
async function createItinerary(URL, requestBody, token) {
  const myData = await postData(URL, request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // setMessage(myData.data);
  console.log(myData);
}

createItinerary(URL, requestBody, token);

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
