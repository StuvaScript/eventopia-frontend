import { useState } from "react";

const SaveEvent = ({ event }) => {
  const [isSaving, setIsSaving] = useState(false);

  const saveEvent = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to save events!");
        setIsSaving(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/itinerary/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: event.name,
            startDateTime: event.startDateTime,
            ticketmasterId: event.ticketmasterId,
            venue: {
              name: event.venue.name,
              address: event.venue.address || "Unknown address",
              city: event.venue.city || "Unknown city",
              state: event.venue.state || "Unknown state",
              postalCode: event.venue.postalCode || "00000",
              coordinates: {
                lat: event.venue.coordinates?.lat || 0,
                lng: event.venue.coordinates?.lng || 0,
              },
            },
            url: event.url || "",
            imageURL: event.imageURL || "",
            info: event.info || "",
            user: localStorage.getItem("userId"),
          }),
        }
      );

      if (response.ok) {
        alert("Event saved successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to save event! Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return { saveEvent, isSaving };
};

export default SaveEvent;
