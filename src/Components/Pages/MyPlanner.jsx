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
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import EmptyList from "../Shared/EmptyList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShareIcon from "@mui/icons-material/Share";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData } from "../../util/index";
import { useAuth } from "../../context/AuthContext.jsx";
import { normalizeEvent } from "../../util/normalizeEvent.js";

const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary`;
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzhiZGJhZTlhMDc5N2EzMGI1ZGQ2ZWQiLCJmaXJzdE5hbWUiOiJuaWhhbCIsImxhc3ROYW1lIjoiZWhkZmgiLCJpYXQiOjE3MzcyMTg5OTEsImV4cCI6MTczNzgyMzc5MX0.GYVwiITKNdFi42YIltcrN4OU8_S1Uw0G19IsmJ_16vU";
const today = new Date();

const MyPlanner = () => {
  const [itineraries, setItineraries] = useState([]); //all users' saved events
  const [filteredItineraries, setFilteredItineraries] = useState([]); //store filtered saved events
  const [selectedFilter, setSelectedFilter] = useState("next"); //selected filter via button
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  //Get token from the login
  // const { state } = useLocation();

  // if (!state) {
  //   console.error("No state found, possibly a navigation issue");
  //   return <div>Error: State not found</div>;
  // }

  // const { name, id, token } = state;
  // const firstName = name ? name.split(" ")[0] : "";

  // if (!token) {
  //   console.error("Token is missing");
  //   return <div>Error: Token is missing</div>;
  // }

  const { token, user } = useAuth();
  const firstName = user?.name ? user.name.split(" ")[0] : "";

  const fetchItineraries = async () => {
    try {
      const response = await getData(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // remove Authorization header
      const itineraryItems = response?.itineraryItems || [];

      const normalized = itineraryItems.map(normalizeEvent);

      setItineraries(normalized);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      setLoading(false);
    }
  };

  // const fetchItineraries = async () => {
  //   try {
  //     const response = await getData(URL, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(JSON.stringify(response));
  //     const itineraryItems = response?.itineraryItems || [];
  //     setItineraries(itineraryItems);
  //     console.log("Itineraries after fetching:", itineraryItems);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching itineraries:", error);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (token) {
      fetchItineraries();
    }
  }, [token]);

  // useEffect(() => {
  //   fetchItineraries();
  // }, []);

  useEffect(() => {
    if (itineraries.length > 0) {
      if (selectedFilter === "next") {
        filterNextEvent();
      } else if (selectedFilter === "past") {
        filterPastEvents();
      } else if (selectedFilter === "all") {
        filterAllEvents();
      }
    }
  }, [selectedFilter, itineraries]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const closeDetailDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

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
        .sort(
          (a, b) => new Date(a.startDateTime) - new Date(b.startDateTime)
        )[0] || null;

    setFilteredItineraries(nextEvent ? [nextEvent] : []);
    console.log("filter next event =", nextEvent);
  };

  const filterPastEvents = () => {
    const pastEvents = itineraries.filter(
      (event) => new Date(event.startDateTime) < today
    );
    setFilteredItineraries(pastEvents);
    console.log("filter past event =", pastEvents);
  };

  const filterAllEvents = () => {
    setFilteredItineraries(itineraries);
    console.log("filter all events =", itineraries);
  };

  return (
    <Box sx={{ marginTop: "120px", paddingLeft: "3%" }}>
      <Typography variant="h4" gutterBottom sx={{ marginLeft: "25px" }}>
        Welcome to Your Planner, {firstName}! 🎉
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
              color={selectedFilter === "next" ? "default" : "primary"}
              sx={{
                borderRadius: "20px",
              }}
            >
              Your Next Event
            </Button>
            <Button
              onClick={() => {
                setSelectedFilter("past");
              }}
              variant="outlined"
              color={selectedFilter === "past" ? "default" : "primary"}
              sx={{
                borderRadius: "20px",
              }}
            >
              Past Events
            </Button>
            <Button
              onClick={() => {
                setSelectedFilter("all");
              }}
              variant="outlined"
              color={selectedFilter === "all" ? "default" : "primary"}
              sx={{
                borderRadius: "20px",
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
                onClick={() => handleEventClick(event)}
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
                  <Typography sx={{ marginBottom: "3px" }} variant="h5">
                    {event.name}
                  </Typography>{" "}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOnIcon
                      sx={{ fontSize: "15px", marginRight: "2px" }}
                    />
                    <Typography sx={{ fontSize: "15px" }}>
                      {event.venue.city + ", " + event.venue.state}
                    </Typography>
                    {""}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTimeFilledIcon
                      sx={{ fontSize: "13px", marginRight: "2px" }}
                    />
                    <Typography
                      sx={{ fontSize: "15px" }}
                      color="text.secondary"
                    >
                      {formatDate(event.startDateTime)} •{" "}
                      {formatTime(event.startDateTime)}{" "}
                    </Typography>
                  </Box>
                </CardContent>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    display: "flex",
                  }}
                >
                  <IconButton aria-label="bookmark" color="inherit">
                    <BookmarkIcon />
                  </IconButton>
                  <IconButton color="inherit">
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
          {/* </Grid> */}
        </Box>
      )}

      <Dialog open={openDialog} onClose={closeDetailDialog}>
        <DialogContent>
          {selectedEvent && (
            <>
              <img
                src={selectedEvent.imageURL}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              />
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {selectedEvent.info}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                // sx={{ marginBottom: 1 }}
              >
                <strong>Date:</strong> {formatDate(selectedEvent.startDateTime)}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                // sx={{ marginBottom: 1 }}
              >
                <strong>Time:</strong> {formatTime(selectedEvent.startDateTime)}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginBottom: 2 }}
              >
                <strong>Location: </strong>
                {selectedEvent.venue.name +
                  ", " +
                  selectedEvent.venue.address +
                  " " +
                  selectedEvent.venue.city +
                  ", " +
                  selectedEvent.venue.state +
                  " " +
                  selectedEvent.venue.postalCode}
              </Typography>
              <Button
                href={selectedEvent.url}
                target="_blank"
                sx={{
                  marginBottom: 2,
                  textDecoration: "underline",
                  textAlign: "left",
                  padding: 0,
                }}
              >
                More Info Here
              </Button>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", marginBottom: 2 }}>
          <Button onClick={closeDetailDialog} color="primary">
            Back to Events
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyPlanner;
