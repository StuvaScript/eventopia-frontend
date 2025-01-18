import {
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import EmptyList from "../Shared/EmptyList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState, useEffect } from "react";
import { getData } from "../../util/index";

const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary`;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzhhZTYzMTM4YjdhM2M5YWFlYzIyZDUiLCJmaXJzdE5hbWUiOiJ3d3d3IiwibGFzdE5hbWUiOiJhYWFhIiwiaWF0IjoxNzM3MTYxMzIzLCJleHAiOjE3Mzc3NjYxMjN9.5marMbUWelmkIoSQBN3K10STzHoR6gWR6qaAST16qdU";
const config = "";
const today = new Date();

const MyPlanner = () => {
  const [itineraries, setItineraries] = useState([]); //all users' saved events
  const [filteredItineraries, setFilteredItineraries] = useState([]); //store filtered saved events
  const [selectedFilter, setSelectedFilter] = useState(null); //selected filter via button
  const [loading, setLoading] = useState(true);

  const fetchItineraries = async () => {
    try {
      const response = await getData(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(JSON.stringify(response));
      const itineraryItems = response?.itineraryItems || [];
      setItineraries(itineraryItems);
      console.log("Itineraries after fetching:", itineraryItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      setLoading(false);
    }
  };

  //call api, get user's events when the comp is mounted
  useEffect(() => {
    fetchItineraries();
  }, []);

  useEffect(() => {
    if (itineraries.length > 0) {
      filterAllEvents();
    }
  }, [itineraries]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toISOString().split("T")[0];
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const filterNextEvent = () => {
    const nextEvent =
      itineraries
        .filter((event) => new Date(event.startDateTime) > today)
        .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))[0] || null;

    setFilteredItineraries(nextEvent ? [nextEvent] : []);
    setSelectedFilter("next");
    console.log("filter next event =", nextEvent);
  };

  const filterPastEvents = () => {
    const pastEvents = itineraries.filter((event) => new Date(event.startDateTime) < today);
    setFilteredItineraries(pastEvents);
    setSelectedFilter("past");
    console.log("filter past event =", pastEvents);
  };

  const filterAllEvents = () => {
    setFilteredItineraries(itineraries);
    setSelectedFilter("all");
    console.log("filter all events =", itineraries);
  };

  return (
    <Box sx={{ marginTop: "120px", padding: "20 px" }}>
      <Typography variant="h4" gutterBottom sx={{ marginLeft: "25px" }}>
        Welcome to Your Planner! 🎉
      </Typography>
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : itineraries.length === 0 ? (
        <EmptyList
          icon={<CalendarTodayIcon sx={{ fontSize: 200 }} />}
          message="Your planner is empty right now, but that's okay—it's just waiting for you to fill it with your exciting events!"
          buttonText="Explore Events >>"
          onClick={() => console.log("Explore Events Clicked")} 
        />
      ) : (
        <>
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
              onClick={filterNextEvent}
              variant="outlined"
              sx={{
                borderRadius: "20px",
                color: selectedFilter === "next" ? "default" : "primary.main",
              }}
            >
              Your Next Event
            </Button>
            <Button
              onClick={filterPastEvents}
              variant="outlined"
              sx={{
                borderRadius: "20px",
                color: selectedFilter === "past" ? "default" : "primary.main",
              }}
            >
              Past Events
            </Button>
            <Button
              onClick={filterAllEvents}
              variant="outlined"
              sx={{
                borderRadius: "20px",
                color: selectedFilter === "all" ? "default" : "primary.main",
              }}
            >
              All
            </Button>
          </Box>
          <Grid container spacing={2}>
            {filteredItineraries.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card sx={{ backgroundColor: "#1A1A1A", color: "#fff" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.imageURL}
                    alt={event.name}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(event.startDateTime)} •{" "}
                      {formatTime(event.startDateTime)}{" "}
                    </Typography>
                    <Typography variant="h6">{event.name}</Typography>{" "}
                  </CardContent>
                  <div>
                    <IconButton aria-label="add to favorites" color="inherit">
                      <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton aria-label="bookmark" color="inherit">
                      <BookmarkBorderIcon />
                    </IconButton>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Paper sx={{ padding: 2 }}></Paper>
    </Box>
  );
};

export default MyPlanner;
