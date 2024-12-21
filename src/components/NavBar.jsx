import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CustomLocationPicker from "../components/Shared/LocationPicker";
import Link from "@mui/material/Link";
import { getData } from "../util";

// Location variables
const city = "Seattle";
const stateCode = "WA";

// Ticketmaster search Url
const URL = `/api/v1/ticketmaster/events/${city}/${stateCode}`;

// Optional config
const config = {
  params: {
    startDateTime: "",
    endDateTime: "",
  },
};

const NavBar = ({ title }) => {
  const [location, setLocation] = React.useState({ city: "", state: "" });

  // Fetch code
  (async () => {
    const myData = await getData(URL, config);
    // setMessage(myData.data);
    console.log(myData);
  })();
  const handleLocationChange = (city, state) => {
    setLocation({ city, state });
    console.log("Selected City:", city);
    console.log("Selected State:", state);
  };
  const handleSearch = () => {
    console.log("Searching with location:", location);
    // Add API call to execute the search
  };

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      default:
        return "App Name"; //What is our app's name
    }
  };
  return (
    <AppBar position="fixed" color="primary" sx={{ padding: 0, top: 0 }}>
      <Toolbar
        disableGutters // Disable default gutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <Typography variant="h6">{title || getTitle()}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton
            sx={{
              backgroundColor: "background.paper",
              p: 1,
              borderRadius: "50%",
              mx: 2,
            }}
          >
            <MusicNoteIcon
              sx={{ color: "primary.contrastText", fontSize: "1.5rem" }}
            />
          </IconButton>

          {/* Middle Icons and Location Picker */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "background.paper",
              borderRadius: "40px",
              px: 2,
              py: 0.5,
              maxWidth: "500px",
              justifyContent: "flex-start",
              ml: 2,
              my: 1,
            }}
          >
            {/* Location Picker */}
            <LocationOnIcon sx={{ color: "primary.main", mr: 1 }} />
            <CustomLocationPicker
              onLocationChange={handleLocationChange}
              InputProps={{ disableUnderline: true }}
              sx={{
                flexGrow: 1,
                backgroundColor: "background.default",
                borderRadius: "5px",
                padding: "5px 10px",
              }}
            />

            {/* Calendar Icon */}
            <IconButton sx={{ color: "primary.main", mx: 1 }}>
              <EventIcon />
            </IconButton>
            {/* Search Icon */}
            <IconButton sx={{ color: "primary.main", mx: 0.5 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
          <Typography
            variant="body1"
            sx={{
              color: "text.primary",
              mx: 2,
              fontSize: "1rem",
              cursor: "pointer",
              paddingLeft: "1rem",
            }}
          >
            Create Your Event
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.primary",
              mx: 2,
              fontSize: "1rem",
              cursor: "pointer",
              borderLeft: "1px solid white",
              paddingLeft: "1rem",
            }}
          >
            Login
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "background.paper",
              color: "text.primary",
              textTransform: "none",
              ml: 2,
              px: 3,
              borderRadius: "25px",
              "&:hover": { backgroundColor: "#323232" },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
