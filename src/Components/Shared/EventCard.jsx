import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import ShareIcon from "@mui/icons-material/Share";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useAuth } from "../../context/AuthContext.jsx";

const EventCard = ({ event, actions }) => {
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   Boolean(localStorage.getItem("token"))
  // );
  const { token, user } = useAuth();
  const isLoggedIn = Boolean(token);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = (e) => {
    e.stopPropagation();
    setSaved(!saved);
    actions?.onSave?.();
  };

  //todo **`` Saving events on the homepage doesn't save to my planner page. But events do save when you search for them. Not sure what the deal is.

  const handleSaveEvent = async () => {
    if (!isLoggedIn) {
      alert("Please log in to save events!");
      return;
    }
    console.log("Event being saved:", event);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ticketmasterId: event.id,
            name: event.title,
            startDateTime: event.date + "T" + (event.time || "00:00:00"),
            venue: {
              name: event.venue || "Unknown Venue",
              address: event.venue || "Unknown address",
              city: "Unknown City", // placeholder
              state: "Unknown State", // placeholder
              postalCode: "00000", // placeholder
              coordinates: { lat: 0, lng: 0 },
            },
            url: event.link || "",
            imageURL: event.image || "",
            info: event.classification || "",
            user: user?._id,
          }),

          // body: JSON.stringify({
          //   name: event.name,
          //   startDateTime: event.startDateTime,
          //   ticketmasterId: event.ticketmasterId,
          //   venue: {
          //     name: event.venue.name,
          //     address: event.venue.address || "Unknown address",
          //     city: event.venue.city || "Unknown city",
          //     state: event.venue.state || "Unknown state",
          //     postalCode: event.venue.postalCode || "00000",
          //     coordinates: {
          //       lat: event.venue.coordinates?.lat || 0,
          //       lng: event.venue.coordinates?.lng || 0,
          //     },
          //   },
          //   url: event.url || "",
          //   imageURL: event.imageURL || "",
          //   info: event.info || "",
          //   // user: localStorage.getItem("userId"),
          //   user: user?._id,
          // }),
        }
      );
      console.log(event.venue.venue.city);
      if (response.ok) {
        alert("Event saved successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to save event:", errorData);
        alert(`Failed to save event! Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid gray",
          borderRadius: "8px",
          padding: 2,
          width: "300px",
          height: "520px",
          backgroundColor: "background.paper",
          cursor: "pointer",
          "&:hover": { boxShadow: 3 },
          overflow: "hidden",
        }}
        onClick={handleOpen}
      >
        <img
          src={event.image}
          alt={event.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <Box sx={{ textAlign: "center", marginTop: 1 }}>
          <Typography variant="body2" color="textSecondary">
            {event.date}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {event.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 1,
            }}
          >
            <AccessTimeIcon sx={{ fontSize: "1rem", marginRight: "4px" }} />
            <Typography variant="body2">{event.time}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "top",
              justifyContent: "flex-start",
              marginTop: "4px",
            }}
          >
            <LocationOnIcon
              sx={{ fontSize: "1rem", marginRight: "4px", marginTop: "5px" }}
            />

            <Typography variant="body2">{event.venue}</Typography>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-around", marginTop: 2 }}
        >
          {isLoggedIn && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setSaved(!saved);
                handleSaveEvent();
              }}
              color="inherit"
            >
              {/* {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />} */}
              {saved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          )}

          {/* <IconButton
            onClick={(e) => {
              e.stopPropagation();
              if (isLoggedIn) {
                setSaved(!saved);
                handleSaveEvent();
              } else {
                alert("Please log in to save events!");
              }
            }}
            color="inherit"
          >
            {saved && isLoggedIn ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton> */}

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              actions.onShare();
            }}
            color="inherit"
          >
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{event.title}</DialogTitle>
        <DialogContent>
          <img
            src={event.image}
            alt={event.title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {event.description}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 1 }}
          >
            <strong>Date:</strong> {event.date}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 1 }}
          >
            <strong>Time:</strong> {event.startDateTime}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 2 }}
          >
            <strong>Location:</strong> {event.venue}
          </Typography>
          <Button href={event.link} target="_blank" sx={{ marginBottom: 2 }}>
            More Info Here
          </Button>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", marginBottom: 2 }}>
          {isLoggedIn && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setSaved(!saved);
                handleSaveEvent();
              }}
              color="inherit"
            >
              {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          )}

          {/* <IconButton
            onClick={(e) => {
              e.stopPropagation();
              if (isLoggedIn) {
                handleSave(e);
              } else {
                alert("Please log in to save events!");
              }
            }}
            color="inherit"
          >
            {saved && isLoggedIn ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton> */}

          <IconButton onClick={actions?.onShare} color="inherit">
            <ShareIcon />
          </IconButton>
        </DialogActions>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Back to Events
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventCard;
