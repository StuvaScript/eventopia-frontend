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
import { ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CustomLocationPicker from "../components/Shared/LocationPicker";
import theme from "../Theme"; // Ensure this path correctly points to your theme file
import Link from "@mui/material/Link";
import { getData } from "../util";

const apiBaseURL = import.meta.env.VITE_API_BASE_URL;

// Location variables
const city = "Seattle";
const stateCode = "WA";

// Ticketmaster search Url
const URL = `${apiBaseURL}/api/v1/ticketmaster/events/${city}/${stateCode}`;

// Optional config
const config = {
  params: {
    startDateTime: "",
    endDateTime: "",
  },
};

const Header = () => {
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

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary" sx={{ padding: "0 2rem" }}>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              sx={{
                backgroundColor: "background.paper",
                p: 1,
                borderRadius: "50%",
                mr: 2,
              }}
            >
              <MusicNoteIcon
                sx={{ color: "primary.contrastText", fontSize: "1.5rem" }}
              />
            </IconButton>
          </Box>

          {/* Middle Icons and Location Picker */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: "background.paper",
              borderRadius: "25px",
              px: 2,
              py: 0.6,
              flexGrow: 1,
              margin: "3px",
              maxWidth: "500px",
            }}
          >
            {/* Location Picker */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <LocationOnIcon
                sx={{ color: "primary.main", mr: 1, width: "10%" }}
              />
              <CustomLocationPicker
                onLocationChange={handleLocationChange}
                InputProps={{
                  disableUnderline: true,
                  // sx: { color: "text.primary", fontSize: "0.5rem" },
                }}
                sx={{
                  flexGrow: 1,
                  backgroundColor: "background.default",
                  borderRadius: "5px",
                  padding: "5px 10px",
                }}
              />
            </Box>
            <Box
              sx={{
                width: "1px",
                backgroundColor: "primary.main",
                height: "24px",
                mx: 1,
              }}
            />
            {/* Calendar Icon */}
            <IconButton sx={{ color: "primary.main", mx: 0.5 }}>
              <EventIcon />
            </IconButton>
            <Box
              sx={{
                width: "1px",
                backgroundColor: "primary.main",
                height: "24px",
                mx: 1,
              }}
            />
            {/* Search Icon */}
            <IconButton sx={{ color: "primary.main", mx: 0.5 }}>
              <SearchIcon />
            </IconButton>
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
              }}
            >
              Event Search
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
              <Link href="/login" variant="body2" style={{ color: "white" }}>
                Login
              </Link>
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
              <Link href="/signup" variant="body2" style={{ color: "white" }}>
                Sign Up
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
