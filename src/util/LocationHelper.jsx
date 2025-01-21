export const getLocationData = async (defaultCity, defaultState) => {
  try {
    if (navigator.geolocation) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `https://geocode.xyz/${latitude},${longitude}?geoit=json`
              );
              const data = await response.json();
              if (data.error || data.city === "Throttled!") {
                console.warn("Geocode API throttled. Using default location.");
                resolve({ city: defaultCity, state: defaultState });
              } else {
                resolve({
                  city: data.city || defaultCity,
                  state: data.state || defaultState,
                });
              }
            } catch {
              resolve({ city: defaultCity, state: defaultState });
            }
          },
          () => resolve({ city: defaultCity, state: defaultState })
        );
      });
    }
    return { city: defaultCity, state: defaultState };
  } catch {
    return { city: defaultCity, state: defaultState };
  }
};

export const fetchEvents = async (city, state) => {
  const url = `${
    import.meta.env.VITE_API_BASE_URL
  }/api/ticketmaster/events/${city}/${state}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.message === "No Events Returned") {
      return { message: "No Events Returned" }; // Return a specific object
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("No events found or invalid response from API.");
    }

    return data.map((event) => ({
      id: event.ticketmasterId,
      title: event.name,
      date: event.dates.startDate,
      time: event.dates.startTime,
      venue: event.venue
        ? `${event.venue.name}, ${event.venue.address}`
        : "Unknown Venue",
      image: event.images?.[0] || "",
      classification: event.classification || "General",
      link: event.url || "#",
    }));
  } catch (err) {
    console.error("Error in fetchEvents:", err.message);
    throw err;
  }
};
