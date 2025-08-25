import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import EventCard from "./Shared/EventCard";
import { fetchEvents } from "../util/LocationHelper";

const EventGrid = ({ user, token }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventsByLocation = async () => {
      try {
        let city = "New York";
        let state = "NY";

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                const locationResponse = await fetch(
                  `https://geocode.xyz/${latitude},${longitude}?geoit=json`
                );
                const locationData = await locationResponse.json();

                // Fallback to default location if API fails or throttles
                if (
                  locationData.error ||
                  locationData.city === "Throttled!" ||
                  !locationData.city
                ) {
                  console.warn(
                    "Geocode API throttled. Using default location."
                  );
                } else {
                  city = locationData.city;
                  state = locationData.state;
                }

                const fetchedEvents = await fetchEvents(city, state);
                if (fetchedEvents.message === "No Events Returned") {
                  setError("No events for your location.");
                } else {
                  setEvents(fetchedEvents.slice(0, 3));
                }
                setLoading(false);
              } catch (err) {
                console.error("Geocoding API Error:", err);
                setError("Server error");
                setLoading(false);
              }
            },
            async (err) => {
              console.warn("Geolocation permission denied:", err);
              const fetchedEvents = await fetchEvents(city, state);
              setEvents(fetchedEvents.slice(0, 3));
              setLoading(false);
            }
          );
        } else {
          console.warn("Geolocation not supported. Using default location.");
          const fetchedEvents = await fetchEvents(city, state);
          setEvents(fetchedEvents.slice(0, 3));
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching events by location:", err);
        setError("Unable to fetch events.");
        setLoading(false);
      }
    };

    fetchEventsByLocation();
  }, []);

  const handleSave = async (event) => {
    if (!user || !token) return; // only allow if logged in
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });
      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? { ...e, isSaved: true } : e))
      );
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  if (loading) return <Typography>Loading events ...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h5"
        sx={{
          marginBottom: 3,
          textAlign: "center",
        }}
      >
        Popular Events Near You
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            user={user} // pass user down
            actions={{
              onSave: () => handleSave(event),
              onShare: () => console.log(`Shared: ${event.title}`),
            }}
          />

          // <EventCard
          //   key={event.id}
          //   event={event}
          //   actions={{
          //     onSave: () => console.log(`Saved: ${event.title}`),
          //     onShare: () => console.log(`Shared: ${event.title}`),
          //   }}
          // />
        ))}
      </Box>
    </Box>
  );
};

export default EventGrid;
