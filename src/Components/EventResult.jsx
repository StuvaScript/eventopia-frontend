import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { getRangeFilter } from "../util/daterangefilter";
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import EmptyList from "./Shared/EmptyList";

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
                    <IconButton aria-label="add to favorites" color="inherit">
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
    </Box>
  );
};

export default EventResult;
