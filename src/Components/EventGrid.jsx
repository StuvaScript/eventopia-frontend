import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import EventCard from "./Shared/EventCard";
import { fetchEvents } from "../util/LocationHelper";
import { normalizeEvent } from "../util/normalizeEvent";

const EventGrid = ({ user, token }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventsByLocation = async () => {
      try {
        // ✅ If logged in, use user’s city/state. Otherwise, fallback to NYC
        const city = user?.city || "New York";
        const state = user?.state || "NY";

        const fetchedEvents = await fetchEvents(city, state);

        if (fetchedEvents.message === "No Events Returned") {
          setError("No events for your location.");
        } else {
          setEvents(fetchedEvents.map(normalizeEvent).slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching events by location:", err);
        setError("Unable to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventsByLocation();
  }, [user]);

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
        prev.map((e) =>
          e.id === event.id ? normalizeEvent({ ...e, isSaved: true }) : e
        )
      );
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  if (loading) return <Typography>Loading events ...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center" }}>
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
            user={user}
            actions={{
              onSave: () => handleSave(event),
              onShare: () => console.log(`Shared: ${event.title}`),
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default EventGrid;
