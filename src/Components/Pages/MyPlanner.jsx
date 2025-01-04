import { Typography, Button, Box, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { getData } from "../../util/index";

const name = "Nihal";
const URL = `/api/v1/itinerary`;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzY3Mzk0YzBhOWY3Njk3OTA0NmE1MmMiLCJmaXJzdE5hbWUiOiJEYW4iLCJsYXN0TmFtZSI6IkFrcm95ZCIsImlhdCI6MTczNDgxOTcyMSwiZXhwIjoxNzM0OTA2MTIxfQ.k6bTkN77-5an2vo3fsGfX5EGn40ALtetfEFRhvj3Qnk";
const config = "";
const today = new Date();

const MyPlanner = () => {
  const [itineraries, setItineraries] = useState([]); //all users' saved events
  const [filteredItineraries, setFilteredItineraries] = useState([]); //store filtered saved events

  const fetchItineraries = async () => {
    try {
      const response = await getData(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Response: ${response}`);
      setItineraries(response);
      setFilteredItineraries(response); // initial load has no filter, equal to saved events
    } catch (error) {
      console.error("Error fetching itineraries:", error);
    }
  };

  //call api, get user's events when the comp is mounted
  useEffect(() => {
    fetchItineraries();
  }, []);

  const filterNextEvent = () => {
    const sortedEvents = itineraries
      .filter((event) => new Date(event.date) > today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const nextEvent = sortedEvents[0];
    setFilteredItineraries(nextEvent || []);
  };

  const filterPasteEvents = () => {
    const pastedEvents = itineraries.filter(
      (event) => new Date(event.date) < today
    );
    setFilteredItineraries(pastedEvents);
  };

  const filterAllEvents = () => {
    setFilteredItineraries(itineraries);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Planner, {name}!
      </Typography>

      {/*Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          maxWidth: "40%",
          x: 2,
          py: 4.6,
        }}
      >
        <Button
          sx={{ backgroundColor: "primary.main", borderRadius: "15%" }}
          onClick={filterNextEvent}
        >
          Your Next Event
        </Button>
        <Button onClick={filterPasteEvents}>Past Events</Button>
        <Button onClick={filterAllEvents}>All</Button>
      </Box>

      <Paper sx={{ padding: 2 }}></Paper>
    </Box>
  );
};

export default MyPlanner;
