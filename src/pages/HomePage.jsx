import * as React from "react";
import AppAppBar from "../components/Header";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { deleteData, getData, patchData, postData } from "../util";

// ``** SIGN UP/REGISTER **``

// // User register Url
// const URL = `/api/v1/user/register`;

// //  register requestBody example
// const requestBody = {
//   firstName: "Dan",
//   lastName: "Akroyd",
//   email: "da@gmail.com",
//   password: "Password129",
//   city: "Austin",
//   state: "TX",
// };

// // Fetch code
// async function registerUser(URL, requestBody) {
//   const myData = await postData(URL, requestBody);
//   // setMessage(myData.data);
//   console.log(myData);
// }

// registerUser(URL, requestBody);

// ``** LOGIN **``

// User login Url
// const URL = `/api/v1/user/login`;

// //  login requestBody example
// const requestBody = {
//   email: "jb100@gmail.com",
//   password: "Password129",
// };

// // Log in user code
// async function logInUser(URL, requestBody) {
//   const myData = await postData(URL, requestBody);
//   // setMessage(myData.data);
//   console.log(myData);
// }

// logInUser(URL, requestBody);

// Token comes from login
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzY3Mzk0YzBhOWY3Njk3OTA0NmE1MmMiLCJmaXJzdE5hbWUiOiJEYW4iLCJsYXN0TmFtZSI6IkFrcm95ZCIsImlhdCI6MTczNDgxODEyNCwiZXhwIjoxNzM0OTA0NTI0fQ.mfJhEb-3454AQ_taxXbJFTq_Ig0TLskWsabTf8kwXXU";

// ``** CREATE ITINERARY **``

// Itinerary Url
const URL = `/api/v1/itinerary`;

//  Itinerary requestBody example
const requestBody = {
  name: "Dan's event",
  date: "2024-12-29",
  location: {
    address: "6780 main St",
    city: "Portland",
    state: "OR",
    postalCode: "97217",
    coordinates: {
      lat: 5,
      lng: 5,
    },
  },
  // user: "6761e4b112dd699eb708dd09",
  user: "6767394c0a9f76979046a52c",
};

//todo Need to figure out how to retrieve user ID. Maybe in login?

// Create itinerary code
async function createItinerary(URL, requestBody, token) {
  const myData = await postData(URL, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // setMessage(myData.data);
  console.log(myData);
}

createItinerary(URL, requestBody, token);

// ``** GET ALL ITINERARIES **``

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
// const eventID = "6764c22ecdb6bebff7ab9e5d";

// Single itinerary Url
// const URL = `/api/v1/itinerary/${eventID}`;

// // Optional config
// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

// ``** GET SINGLE ITINERARY **``

// // Get single itinerary code
// async function getSingleItinerary(URL, config) {
//   console.log(config);
//   const myData = await getData(URL, config);
//   // setMessage(myData.data);
//   console.log(myData);
// }

// getSingleItinerary(URL, config);

// ``** UPDATE SINGLE ITINERARY **``

//  Itinerary update requestBody example
// const requestBody = {
//   name: "Stu's third event",
//   date: "2024-12-29",
//   location: {
//     address: "2222 main St",
//     city: "Paris",
//     state: "TX",
//     postalCode: "44444",
//     coordinates: {
//       lat: 50,
//       lng: 50,
//     },
//   },
//   user: "6761e4b112dd699eb708dd09",
// };

//todo Need to figure out how to retrieve user ID. Maybe in login?

// Update itinerary code
// async function updateItinerary(URL, requestBody) {
//   console.log(requestBody);
//   const myData = await patchData(URL, requestBody, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   // setMessage(myData.data);
//   console.log(myData);
// }

// updateItinerary(URL, requestBody);

// ``** DELETE SINGLE ITINERARY **``

// Delete single itinerary code
// async function deleteItinerary(URL) {
//   const myData = await deleteData(URL, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   // setMessage(myData.data);
//   console.log(myData);
// }

// deleteItinerary(URL);

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
