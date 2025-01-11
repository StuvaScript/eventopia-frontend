import { Typography, Button, Box, Paper, Grid, Card, CardContent, CardMedia, IconButton,} from "@mui/material";
import EmptyList from "../Shared/EmptyList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useState, useEffect } from "react";
import { getData } from "../../util/index";

// const events = [
//   {
//     id: 1,
//     title: "Event 1",
//     date: "Fri, Dec 6th",
//     time: "9:00pm",
//     image: "event1.jpg",
//   },
//   {
//     id: 2,
//     title: "Event 2",
//     date: "Fri, Dec 6th",
//     time: "9:00pm",
//     image: "event2.jpg",
//   },
//   {
//     id: 3,
//     title: "Event 3",
//     date: "Fri, Dec 6th",
//     time: "9:00pm",
//     image: "event3.jpg",
//   },
// ];

const name = "Nihal";
const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary`;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzgxYzdjNWZkMjExZWZhZjViMTgzNmUiLCJmaXJzdE5hbWUiOiJBYmNhYmMiLCJsYXN0TmFtZSI6IkFiY2FiYyIsImlhdCI6MTczNjU1ODU1OCwiZXhwIjoxNzM2NjQ0OTU4fQ.3zoXjycPW7BIZxGFgpnbTVyCbxWrgKEtmKjH3ysbWgc";
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
      console.log(`Response: ${response}`);
      filterNextEvent();
      setItineraries(response);
      setFilteredItineraries(response); 
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

  const filterNextEvent = () => {
    const sortedEvents = itineraries
      .filter((event) => new Date(event.date) > today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const nextEvent = sortedEvents[0];
    setFilteredItineraries(nextEvent || []);
    setSelectedFilter("next");
  };

  const filterPasteEvents = () => {
    const pastedEvents = itineraries.filter(
      (event) => new Date(event.date) < today
    );
    setFilteredItineraries(pastedEvents);
    setSelectedFilter("past");
  };

  const filterAllEvents = () => {
    setFilteredItineraries(itineraries);
    setSelectedFilter("all");
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Planner, {name}!
      </Typography>
      {loading ?
       (
        <Typography variant="h6">Loading...</Typography>
      ) 
      : (!itineraries || itineraries.itineraryItems.length === 0) ? (
        <EmptyList
          icon={<CalendarTodayIcon sx={{ fontSize: 200 }} />}
          message="Your planner is empty right now, but that's okay—it's just waiting for you to fill it with your exciting events!"
          buttonText="Explore Events >>"
          onClick={() => console.log("Explore Events Clicked")} // add logic
        />
      ) 
      : (
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
              onClick={filterPasteEvents}
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
                    image={event.image}
                    alt={event.title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {event.date} • {event.time}{" "}
                    </Typography>
                    <Typography variant="h6">{event.title}</Typography>{" "}
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
