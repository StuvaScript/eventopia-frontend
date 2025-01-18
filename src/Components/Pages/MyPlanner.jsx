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
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "../../util/index";

const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary`;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzhiZGJhZTlhMDc5N2EzMGI1ZGQ2ZWQiLCJmaXJzdE5hbWUiOiJuaWhhbCIsImxhc3ROYW1lIjoiZWhkZmgiLCJpYXQiOjE3MzcyMTg5OTEsImV4cCI6MTczNzgyMzc5MX0.GYVwiITKNdFi42YIltcrN4OU8_S1Uw0G19IsmJ_16vU";
const today = new Date();

const MyPlanner = () => {
  const [itineraries, setItineraries] = useState([]); //all users' saved events
  const [filteredItineraries, setFilteredItineraries] = useState([]); //store filtered saved events
  const [selectedFilter, setSelectedFilter] = useState("next"); //selected filter via button
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  if (!loading && itineraries.length > 0) {
    if (selectedFilter === "next") {
      filterNextEvent();
    } else if (selectedFilter === "past") {
      filterPastEvents();
    } else if (selectedFilter === "all") {
      filterAllEvents();
    }
  }
}, [selectedFilter, itineraries, loading]);

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
    console.log("filter next event =", nextEvent);
  };

  const filterPastEvents = () => {
    const pastEvents = itineraries.filter((event) => new Date(event.startDateTime) < today);
    setFilteredItineraries(pastEvents);
    console.log("filter past event =", pastEvents);
  };

  const filterAllEvents = () => {
    setFilteredItineraries(itineraries);
    setSelectedFilter("all");
    console.log("filter all events =", itineraries);
  };

  return (
    <Box sx={{ marginTop: "120px", paddingLeft: "3%" }}>
      <Typography variant="h4" gutterBottom sx={{ marginLeft: "25px" }}>
        Welcome to Your Planner! 🎉
      </Typography>
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : itineraries.length === 0 ? (
        <EmptyList
          icon={<CalendarTodayIcon sx={{ fontSize: 200 }} />}
          message="Your planner is empty right now, but that's okay—it's just waiting for you to fill it with your exciting events!"
        />
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              maxWidth: "33%",
              x: 2,
              py: 4.6,
            }}
          >
            <Button
              onClick={() => {
                setSelectedFilter("next");
              }}
              variant="outlined"
              sx={{
                borderRadius: "20px",
                color: selectedFilter === "next" ? "default" : "main",
              }}
            >
              Your Next Event
            </Button>
            <Button
              onClick={() => {
                setSelectedFilter("past");
              }}
              variant="outlined"
              sx={{
                borderRadius: "20px",
                color: selectedFilter === "past" ? "default" : "main",
              }}
            >
              Past Events
            </Button>
            <Button
              onClick={() => {
                setSelectedFilter("all");
              }}
              variant="outlined"
              sx={{
                borderRadius: "20px",
                color: selectedFilter === "all" ? "default" : "main",
              }}
            >
              All
            </Button>
          </Box>
          {/* <Grid container spacing={2} sx={{height:"30px"}}> */}
          {filteredItineraries.map((event) => (
            <Grid item xs={12} key={event.ticketmasterId} marginBottom={5}>
              <Card
                sx={{
                  backgroundColor: "#1A1A1A",
                  color: "#fff",
                  margin: "16px",
                  marginRight: "50%",
                  display: "flex",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  image={event.imageURL}
                  sx={{
                    objectFit: "cover",
                    width: "180px",
                    height: "180px",
                    marginRight: "16px",
                  }}
                />
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h5">{event.name}</Typography>{" "}
                  <Typography variant="body3" color="text.secondary">
                    {formatDate(event.startDateTime)} •{" "}
                    {formatTime(event.startDateTime)}{" "}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <IconButton aria-label="add to favorites" color="inherit">
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton aria-label="bookmark" color="inherit">
                    <BookmarkBorderIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
          {/* </Grid> */}
        </Box>
      )}
    </Box>
  );
};

export default MyPlanner;
