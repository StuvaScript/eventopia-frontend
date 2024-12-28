import { Typography, Button, Box, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { getData } from "../util/index";

const name = "Nihal";
const url = "";
const config = "";
const today = new Date();

const MyPlanner = () => {
  const [events, setEvents] = useState([]); //all users' saved events
  const [filteredEvents, setFilteredEvents] = useState([]); //to store filtered saved events

  const fetchUserSavedEvents = async () => {
    const savedEvents = await getData(url, config);
    setEvents(savedEvents);
    setFilteredEvents(savedEvents); // initial load has no filter, equal to saved events
  };

  //call api, get user's events when the comp is mounted
  useEffect(() => {
    fetchUserSavedEvents();
  }, []);


  const filterNextEvent = () => {
    const sortedEvents = events
      .filter((event) => new Date(event.date) > today)
      .sort((a, b) => new Date(a.date) > new Date(b.date));
    const nextEvent = sortedEvents[0];
    setFilteredEvents(nextEvent);
  };

  const filterPasteEvents = () => {
    const pastedEvents = events.filter((event) => new Date(event.date) < today);
    setFilteredEvents(pastedEvents);
  };

  const filterAllEvents = () => {
    setFilteredEvents(events);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Planner, {name}!
      </Typography>

      {/*Buttons */}
      <Box>
        <Button>Your Next Event</Button>
        <Button>Past Events</Button>
        <Button>All</Button>
      </Box>

      <Paper sx={{ padding: 2 }}></Paper>
    </Box>
  );
};

export default MyPlanner;
