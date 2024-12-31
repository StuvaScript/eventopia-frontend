import React from "react";
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

const events = [
  {
    id: 1,
    title: "Event 1",
    date: "Fri, Dec 6th",
    time: "9:00pm",
    image: "event1.jpg",
  },
  {
    id: 2,
    title: "Event 2",
    date: "Fri, Dec 6th",
    time: "9:00pm",
    image: "event2.jpg",
  },
  {
    id: 3,
    title: "Event 3",
    date: "Fri, Dec 6th",
    time: "9:00pm",
    image: "event3.jpg",
  },
];

const Hero = () => {
  return (
    <div>
      <Typography
        variant="h5"
        align="center"
        sx={{ margin: "20px 0", color: "#fff" }}
      >
        Popular Events
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ padding: "20px" }}
      >
        {events.map((event) => (
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
                  {event.date} • {event.time}
                </Typography>
                <Typography variant="h6">{event.title}</Typography>
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
    </div>
  );
};

export default Hero;
