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
import CustomLocationPicker from "./Shared/LocationPicker";
import CustomDatePicker from "./Shared/DatePicker";
import Link from "@mui/material/Link";
import { useState } from "react";
import { getData } from "../util";

const NavBar = ({ title }) => {
  const [location, setLocation] = React.useState({ city: "", state: "" });
  const [dateRange, setDateRange] = useState([]);

  const handleLocationChange = (city, state) => {
    setLocation({ city, state });
    console.log("Selected City:", city);
    console.log("Selected State:", state);
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const handleSearch = async () => {
    const URL = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/v1/ticketmaster/events/${location.city}/${location.state}`;

    // Optional config
    const config = {
      params: {
        startDateTime: dateRange[0],
        endDateTime: dateRange[1],
      },
    };

    console.log("Request URL:", URL);
    console.log("Request Config:", config);

    // Add API call to execute the search
    try {
      const response = await getData(URL, config);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }} />
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
            justifyContent: "space-around",
            backgroundColor: "background.paper",
            borderRadius: "25px",
            px: 2,
            py: 0.6,
            flexGrow: 1,
            margin: "3px",
            maxWidth: "55%",
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
              sx={{ color: "primary.main", mr: 1, width: "7%" }}
            />
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
          </Box>
          <Box
            sx={{
              width: "1px",
              backgroundColor: "primary.main",
              height: "24px",
              mx: 1,
            }}
          />
          <CustomDatePicker
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onDateRangeChange={handleDateRangeChange}
          />
          {/* Search Icon */}
          <IconButton
            onClick={handleSearch}
            sx={{ color: "primary.main", mx: 0.5 }}
          >
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
