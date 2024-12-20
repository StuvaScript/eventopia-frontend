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

// Log in user code
// async function logInUser(URL, requestBody) {
//   const myData = await postData(URL, requestBody);
//   // setMessage(myData.data);
//   console.log(myData);
// }

// logInUser(URL, requestBody);

// Token comes from login
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYxZTRiMTEyZGQ2OTllYjcwOGRkMDkiLCJmaXJzdE5hbWUiOiJKaW0iLCJsYXN0TmFtZSI6IkJyb3duIiwiaWF0IjoxNzM0NjUxMzMwLCJleHAiOjE3MzQ3Mzc3MzB9.YBsyRKglqWFU50dT9iU_LSFjJipTr7iTGPxrkfF25yw";

// Itinerary Url
// const URL = `/api/v1/itinerary`;

//  Itinerary requestBody example
// const requestBody = {
//   name: "Stu's other event",
//   date: "2024-12-29",
//   location: {
//     address: "6780 main St",
//     city: "Portland",
//     state: "OR",
//     postalCode: "97217",
//     coordinates: {
//       lat: 5,
//       lng: 5,
//     },
//   },
//   user: "6761e4b112dd699eb708dd09",
// };

//todo Need to figure out how to retrieve user ID. Maybe in login?

// Create itinerary code
// async function createItinerary(URL, requestBody, token) {
//   const myData = await postData(URL, requestBody, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   // setMessage(myData.data);
//   console.log(myData);
// }

// createItinerary(URL, requestBody, token);

// Get itinerary code
// async function getItinerary(URL) {
//   const myData = await getData(URL, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   // setMessage(myData.data);
//   console.log(myData);
// }

// getItinerary(URL);

// event ID, does this info come from creating the event?
const eventID = "6764c22ecdb6bebff7ab9e5d";

// Single itinerary Url
const URL = `/api/v1/itinerary/${eventID}`;

// Optional config
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// Get single itinerary code
async function getSingleItinerary(URL, config) {
  console.log(config);
  const myData = await getData(URL, config);
  // setMessage(myData.data);
  console.log(myData);
}

getSingleItinerary(URL, config);

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
