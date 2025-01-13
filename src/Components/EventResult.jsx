import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { getRangeFilter } from "../util/daterangefilter";
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";

const EventResult = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const location = useLocation();
  const data = location.state;
  const city = data.city;
  const state = data.state;

  useEffect(() => {
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
      const sortedEvents = allEvents
        .filter((event) => {
          const eventDate = new Date(event.dates.startDate);
          if (eventDate >= start && eventDate <= end) {
            return true;
          } else {
            false;
          }
        })
        .sort((a, b) =>
          new Date(a.dates.startDate) > new Date(b.dates.startDate) ? 1 : -1
        );
      setEvents(sortedEvents || []);
    } else {
      setEvents([]);
    }
  };

  return (
    <div>
      <Typography
        variant="h5"
        align="center"
        sx={{ margin: "20px 0", color: "#fff" }}
      >
        Events for location : {city} {"-"} {state}
      </Typography>
      <Stack direction="row" spacing={2} padding={3}>
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
        sx={{ padding: "20px" }}
      >
        {isloading && <Typography>Loading...</Typography>}
        {error && <Typography>Error:{error.message}</Typography>}
        {events.length > 0 ? (
          events.map((event) => (
            <Grid item xs={10} sm={6} md={4} key={event.ticketmasterId}>
              <Card sx={{ backgroundColor: "#1A1A1A", color: "#fff" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={event.images[0]}
                  alt={event.name}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {event.dates.startDate} • {event.dates.startTime}
                  </Typography>
                  <Typography variant="h6">{event.name}</Typography>
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
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No events to display</Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default EventResult;
