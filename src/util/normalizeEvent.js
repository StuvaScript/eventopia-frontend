// src/utils/normalizeEvent.js

export function normalizeEvent(event) {
  // ensure we always have a stable unique id
  const id =
    event.ticketmasterId ||
    event.id ||
    event._id ||
    `fallback-${Math.random().toString(36).substr(2, 9)}`;

  const venueObj =
    typeof event.venue === "object" && event.venue !== null ? event.venue : {};

  return {
    id, // ✅ unique key for React
    ticketmasterId: event.ticketmasterId || event.id || "",
    name: event.name || event.title || "Untitled Event",
    startDateTime:
      event.startDateTime ||
      (event.date && event.time
        ? `${event.date}T${event.time}`
        : event.date || ""),

    // ✅ venue string for display
    venue: venueObj.name || event.venue || "Unknown Venue",

    // ✅ keep full venue object if needed
    venueRaw: {
      name:
        venueObj.name || (typeof event.venue === "string" ? event.venue : ""),
      address:
        venueObj.address ||
        (typeof event.venue === "string" ? event.venue : ""),
      city: venueObj.city || "",
      state: venueObj.state || "",
      postalCode: venueObj.postalCode || "",
      coordinates: venueObj.coordinates || { lat: 0, lng: 0 },
    },

    url: event.url || event.link || "",
    imageURL: event.imageURL || event.image || "",
    info: event.info || event.classification || "",
    user: event.user || null,
  };
}
