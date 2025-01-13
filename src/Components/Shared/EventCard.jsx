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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const EventCard = ({ event, actions }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    actions?.onLike?.();
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setSaved(!saved);
    actions?.onSave?.();
  };

  const handleSaveEvent = async () => {
    if (!isLoggedIn) {
      alert("Please log in to save events!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary/${event._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: event.title,
            date: event.date,
            location: {
              address: event.location.address || "Unknown address",
              city: event.location.city || "Unknown city",
              state: event.location.state || "Unknown state",
              postalCode: event.location.postalCode || "00000",
              coordinates: {
                lat: event.location.coordinates?.lat || 0,
                lng: event.location.coordinates?.lng || 0,
              },
            },
            user: localStorage.getItem("userId"),
          }),
        }
      );

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
          backgroundColor: "background.paper",
          cursor: "pointer",
          "&:hover": { boxShadow: 3 },
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
              alignItems: "center",
              justifyContent: "center",
              marginTop: "4px",
            }}
          >
            <LocationOnIcon sx={{ fontSize: "1rem", marginRight: "4px" }} />
            <Typography variant="body2">{event.location}</Typography>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-around", marginTop: 2 }}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              if (isLoggedIn) {
                handleLike(e);
              } else {
                alert("Please log in to like events!");
              }
            }}
            color="inherit"
          >
            {liked && isLoggedIn ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          <IconButton
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
          </IconButton>

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
            <strong>Time:</strong> {event.time}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 2 }}
          >
            <strong>Location:</strong> {event.location}
          </Typography>
          <Button href={event.link} target="_blank" sx={{ marginBottom: 2 }}>
            More Info Here
          </Button>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", marginBottom: 2 }}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              if (isLoggedIn) {
                handleLike(e);
              } else {
                alert("Please log in to like events!");
              }
            }}
            color="inherit"
          >
            {liked && isLoggedIn ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          <IconButton
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
          </IconButton>

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
