import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { getRangeFilter } from "../util/daterangefilter";
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import EmptyList from "./Shared/EmptyList";
import { getData } from "../util/index";
import { useAuth } from "../context/AuthContext.jsx";

const EventResult = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { token } = useAuth();
  const location = useLocation();
  const data = location.state;
  const city = data.city;
  const state = data.state;

  useEffect(() => {
    setSelectedFilter("all");
    //Sort the events
    if (data && Array.isArray(data.events)) {
      const sortedEvents = data.events.sort((a, b) =>
        new Date(a.dates.startDate) > new Date(b.dates.startDate) ? 1 : -1
      );
      setAllEvents(sortedEvents);
      setEvents(sortedEvents);
    } else {
      setAllEvents([]);
      setEvents([]);
    }
  }, [data]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    if (filter === "all") {
      setEvents(allEvents);
    } else if (allEvents) {
      filterForRange(filter);
    }
  };

  const filterForRange = (filter) => {
    const range = getRangeFilter(filter);
    const start = range.start;
    const end = range.end;
    if (allEvents) {
      const filterEvents = allEvents.filter((event) => {
        const eventDate = new Date(
          event.dates.startDate + "T" + event.dates.startTime + "Z"
        );
        if (eventDate >= start && eventDate <= end) {
          return true;
        } else {
          return false;
        }
      });
      if (filterEvents) {
        const sortedEvents = filterEvents.sort((a, b) =>
          new Date(a.dates.startDate) > new Date(b.dates.startDate) ? 1 : -1
        );
        setEvents(sortedEvents || []);
      }
    } else {
      setEvents([]);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const closeDetailDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  //todo Fetching search results isn't working now

  const handleSaveToPlanner = async (event) => {
    try {
      // const token = localStorage.getItem("token"); // or get from state

      const body = {
        ticketmasterId: event.ticketmasterId,
        name: event.name,
        startDateTime: `${event.dates.startDate}T${event.dates.startTime}Z`,
        venue: {
          name: event.venue.name,
          address: event.venue.address,
          city: event.venue.city,
          state: event.venue.state,
          postalCode: event.venue.postalCode,
        },
        url: event.url,
        imageURL: event.images[0],
        info: event.info,
      };

      // Only add coordinates if they exist
      if (event.venue.coordinates) {
        body.venue.coordinates = {
          lat: event.venue.coordinates.lat,
          lng: event.venue.coordinates.lng,
        };
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) throw new Error("Failed to save event");

      setSavedEvents((prev) => [...prev, event.ticketmasterId]);
      console.log("Saved to planner:", event.name);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ py: 8, px: 3 }}>
      <Typography align="center" sx={{ mt: 5, mb: 4, color: "#fff" }}>
        Events for location : {city} {"-"} {state}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        paddingBottom={2}
        flexWrap="wrap"
        display="flex"
        justifyContent="center"
      >
        <Button
          onClick={() => handleFilterChange("all")}
          color={selectedFilter === "all" ? "default" : "primary"}
          variant="outlined"
          sx={{ borderRadius: "20px", color: "white" }}
        >
          All
        </Button>
        <Button
          onClick={() => handleFilterChange("today")}
          color={selectedFilter === "today" ? "default" : "primary"}
          variant="outlined"
          sx={{ borderRadius: "20px", color: "white" }}
        >
          Today
        </Button>
        <Button
          onClick={() => handleFilterChange("thisweek")}
          color={selectedFilter === "thisweek" ? "default" : "primary"}
          variant="outlined"
          sx={{ borderRadius: "20px", color: "white" }}
        >
          This Week
        </Button>
        <Button
          onClick={() => handleFilterChange("nextweek")}
          color={selectedFilter === "nextweek" ? "default" : "primary"}
          variant="outlined"
          sx={{ borderRadius: "20px", color: "white" }}
        >
          Next Week
        </Button>
        <Button
          onClick={() => handleFilterChange("thismonth")}
          color={selectedFilter === "thismonth" ? "default" : "primary"}
          variant="outlined"
          sx={{ borderRadius: "20px", color: "white" }}
        >
          This Month
        </Button>
        <Button
          onClick={() => handleFilterChange("nextmonth")}
          color={selectedFilter === "nextmonth" ? "default" : "primary"}
          variant="outlined"
          sx={{ borderRadius: "20px", color: "white" }}
        >
          Next Month
        </Button>
      </Stack>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ paddingBottom: "30px" }}
      >
        {isloading && <Typography>Loading...</Typography>}
        {error && <Typography>Error:{error.message}</Typography>}
        {events.length > 0 ? (
          events.map((event) => (
            <Grid item xs={12} sm={6} md={3} key={event.ticketmasterId}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "#1A1A1A",
                  color: "#fff",
                }}
                onClick={() => handleEventClick(event)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={event.images[0]}
                  alt={event.name}
                />

                <Box
                  sx={{
                    padding: "8px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",

                    height: "160px",
                  }}
                >
                  <Box>
                    <Typography fontSize="15px" color="text.secondary">
                      {event.dates.startDate} • {event.dates.startTime}
                    </Typography>
                    <Typography fontSize="15px">{event.name}</Typography>
                  </Box>

                  <Box>
                    <IconButton
                      aria-label="add to favorites"
                      color="inherit"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent opening the dialog
                        handleSaveToPlanner(event);
                      }}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton aria-label="bookmark" color="inherit">
                      <BookmarkBorderIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              "& .MuiBox-root ": {
                padding: "0",
              },
            }}
          >
            <EmptyList
              icon={<FindInPageIcon sx={{ fontSize: 90 }} />}
              message="Sorry, we couldn't find any events matching your search criteria. Try adjusting your filters or search again later!"
            />
          </Box>
        )}
      </Grid>

      <Dialog open={openDialog} onClose={closeDetailDialog}>
        <DialogContent>
          {selectedEvent && (
            <>
              <img
                src={selectedEvent.images[0]}
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
              <Typography variant="body2" color="textSecondary">
                <strong>Date:</strong> {selectedEvent.dates.startDate}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Time:</strong> {selectedEvent.dates.startTime}
              </Typography>
              <Typography color="textSecondary" sx={{ marginBottom: 2 }}>
                <strong>Location: </strong>
                {selectedEvent.venue.name +
                  ", " +
                  selectedEvent.venue.address +
                  " " +
                  selectedEvent.venue.city +
                  ", " +
                  selectedEvent.venue.state}
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

export default EventResult;
