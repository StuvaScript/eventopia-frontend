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
import { getData } from "../util";
import { getRangeFilter } from "../util/daterangefilter";
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/material";
import { Button, ButtonGroup } from "@mui/material";

const EventResult = () => {
  const [events, setEvents] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const location = useLocation();
  const data = location.state;
  const city = data.city;
  const state = data.state;

  // Fetch code
  const getEvents = async (startDate, endDate) => {
    setIsLoading(true);
    // Optional config
    const config = {
      params: {
        dateRangeStart: startDate,
        dateRangeEnd: endDate,
      },
    };
    // Ticketmaster search Url
    const URL = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/ticketmaster/events/${city}/${state}`;

    try {
      const response = await getData(URL, config);
      console.log(response);
      if (Array.isArray(response)) {
        setEvents(response);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Throw Error:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getEvents("", "");
  }, [data]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);

    if (filter === "all") {
      getEvents("", "");
    } else {
      // const end = new Date(today);
      const range = getRangeFilter(filter);
      const today = range.start;
      const end = range.end;
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
      const day = String(today.getDate()).padStart(2, "0");

      const eyear = end.getFullYear();
      const emonth = String(end.getMonth() + 1).padStart(2, "0"); // January is 0!
      const eday = String(end.getDate()).padStart(2, "0");
      getEvents(`${year}-${month}-${day}`, `${eyear}-${emonth}-${eday}`);
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
      <Stack direction="row" spacing={2}>
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
            <Grid item xs={12} sm={6} md={4} key={event.id}>
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
