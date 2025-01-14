import { deleteData, getData, patchData, postData } from ".";
// *************************************************
// *************************************************
// // ``** SIGN UP/REGISTER **``

// // User register Url
// const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/register`;

// //  register requestBody example
// const requestBody = {
//   firstName: "Billy",
//   lastName: "Bob",
//   email: "bb100@gmail.com",
//   password: "Password129",
//   city: "Austin",
//   state: "TX",
// };

// async function registerUser(URL, requestBody) {
//   const myData = await postData(URL, requestBody);
//   console.log(myData);
// }

// registerUser(URL, requestBody);

// *************************************************
// *************************************************
// ``** LOGIN **``

// User login Url
// const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`;

//  login requestBody example
// const requestBody = {
//   email: "bb100@gmail.com",
//   password: "Password129",
// };

// async function logInUser(URL, requestBody, csrfToken) {
//   const myData = await postData(URL, requestBody);
//   console.log(myData);
// }

// logInUser(URL, requestBody, csrfToken);

// *************************************************
// *************************************************
// ``** CREATE ITINERARY **``

// Itinerary Url
// const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary`;

//  Itinerary requestBody example
// const requestBody = {
//   name: "Dan's event",
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
//   user: "6767394c0a9f76979046a52c", // <-- user ID comes from "register" and "login" responses
// };

// Token example (comes from "register" and "login" responses)
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzY3Mzk0YzBhOWY3Njk3OTA0NmE1MmMiLCJmaXJzdE5hbWUiOiJEYW4iLCJsYXN0TmFtZSI6IkFrcm95ZCIsImlhdCI6MTczNDgxOTcyMSwiZXhwIjoxNzM0OTA2MTIxfQ.k6bTkN77-5an2vo3fsGfX5EGn40ALtetfEFRhvj3Qnk";

// async function createItinerary(URL, requestBody, token, csrfToken) {
//   const myData = await postData(URL, requestBody, csrfToken, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   console.log(myData);
// }

// createItinerary(URL, requestBody, token,csrfToken);

// *************************************************
// *************************************************
// ``** GET ALL ITINERARIES **``

// Itinerary Url
// const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary`;

// Token example (comes from "register" and "login" responses)
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzY3Mzk0YzBhOWY3Njk3OTA0NmE1MmMiLCJmaXJzdE5hbWUiOiJEYW4iLCJsYXN0TmFtZSI6IkFrcm95ZCIsImlhdCI6MTczNDgxOTcyMSwiZXhwIjoxNzM0OTA2MTIxfQ.k6bTkN77-5an2vo3fsGfX5EGn40ALtetfEFRhvj3Qnk";

// async function getAllItineraries(URL, token) {
//   const myData = await getData(URL, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   console.log(myData);
// }

// getAllItineraries(URL, token);

// *************************************************
// *************************************************
// ``** GET SINGLE ITINERARY **``

// event ID example (this comes from creating an event under the "itineraryItem.user._id" response and from getting the list of all events under the "itineraryItems.user._id" response)
// const eventID = "6764c22ecdb6bebff7ab9e5d";

// Single itinerary Url
// const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary/${eventID}`;

// Token example (comes from "register" and "login" responses)
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzY3Mzk0YzBhOWY3Njk3OTA0NmE1MmMiLCJmaXJzdE5hbWUiOiJEYW4iLCJsYXN0TmFtZSI6IkFrcm95ZCIsImlhdCI6MTczNDgxOTcyMSwiZXhwIjoxNzM0OTA2MTIxfQ.k6bTkN77-5an2vo3fsGfX5EGn40ALtetfEFRhvj3Qnk";

// async function getSingleItinerary(URL, token) {
//   const myData = await getData(URL, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   console.log(myData);
// }

// getSingleItinerary(URL, token);

// *************************************************
// *************************************************
// ``** UPDATE SINGLE ITINERARY **``

// event ID example (this comes from creating an event under the "itineraryItem.user._id" response and from getting the list of all events under the "itineraryItems.user._id" response)
// const eventID = "6764c22ecdb6bebff7ab9e5d";

// Single itinerary Url
// const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary/${eventID}`;

//  Itinerary update requestBody example
// const requestBody = {
//   name: "Sarah's third event",
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
//   user: "6761e4b112dd699eb708dd09", // <-- user ID comes from "register" and "login" responses
// };

// Token example (comes from "register" and "login" responses)
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzY3Mzk0YzBhOWY3Njk3OTA0NmE1MmMiLCJmaXJzdE5hbWUiOiJEYW4iLCJsYXN0TmFtZSI6IkFrcm95ZCIsImlhdCI6MTczNDgxOTcyMSwiZXhwIjoxNzM0OTA2MTIxfQ.k6bTkN77-5an2vo3fsGfX5EGn40ALtetfEFRhvj3Qnk";

// async function updateItinerary(URL, requestBody, token, csrfToken,) {
//   const myData = await patchData(URL, requestBody, csrfToken, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   console.log(myData);
// }

// updateItinerary(URL, requestBody, token, csrfToken);

// *************************************************
// *************************************************
// ``** DELETE SINGLE ITINERARY **``

// event ID example (this comes from creating an event under the "itineraryItem.user._id" response and from getting the list of all events under the "itineraryItems.user._id" response)
// const eventID = "6764c22ecdb6bebff7ab9e5d";

// Single itinerary Url
// const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary/${eventID}`;

// async function deleteItinerary(URL, csrfToken) {
//   const myData = await deleteData(URL, csrfToken, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   console.log(myData);
// }

// deleteItinerary(URL, csrfToken,);
