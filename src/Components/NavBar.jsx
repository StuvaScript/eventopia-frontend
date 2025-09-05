import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CustomLocationPicker from "./Shared/LocationPicker";
import CustomDatePicker from "./Shared/DatePicker";
import Link from "@mui/material/Link";
import { getData } from "../util";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const NavBar = ({ title }) => {
  const { isLoggedIn, user, logout } = useAuth();
  const [location, setLocation] = React.useState({
    city: user?.city || "",
    state: user?.state || "",
  });
  const [dateRange, setDateRange] = useState([]);
  const [error, setError] = useState({ city: false, state: false });
  const [keyword, setKeyword] = useState("");

  const theme = useTheme();

  const handleLocationChange = (city, state) => {
    setLocation({ city, state });
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const handleKeywordChange = (event) => {
    const keyword = event.target.value;
    setKeyword(keyword);
  };

  const navigate = useNavigate();

  const handleSearch = async () => {
    const URL = `${import.meta.env.VITE_API_BASE_URL}/api/ticketmaster/events/${
      location.city
    }/${location.state}`;

    // Default: today → 14 days later
    const now = new Date();
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(now.getDate() + 14);

    const dateRangeStart = dateRange[0]
      ? new Date(dateRange[0]).toISOString()
      : now.toISOString();
    const dateRangeEnd = dateRange[1]
      ? new Date(dateRange[1]).toISOString()
      : twoWeeksLater.toISOString();

    const config = {
      params: {
        dateRangeStart,
        dateRangeEnd,
        keyword: keyword || "",
      },
    };

    if (!location.city || !location.state) {
      setError({
        city: !location.city,
        state: !location.state,
      });
      return;
    } else {
      setError({ city: false, state: false });
    }

    try {
      const response = await getData(URL, config);
      const inputData = {
        city: location.city,
        state: location.state,
        token: user?.token,
        name: user?.name,
        events: response,
        isLoggedIn: isLoggedIn,
      };
      navigate("/eventresult", { state: inputData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      default:
        return "Eventopia";
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const handleMyPlanner = () => {
    navigate("/myplanner");
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        backdropFilter: "blur(8px)",
        backgroundColor: alpha(theme.palette.primary.main, 0.7),
        padding: 0,
        top: 0,
      }}
    >
      <Toolbar
        disableGutters // Disable default gutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexGrow: 1,
          }}
        >
          <Box sx={{ marginRight: "2%", display: "flex" }}>
            <Typography variant="h4">{title || getTitle()}</Typography>
            <IconButton
              sx={{
                backgroundColor: "background.paper",
                p: 1,
                borderRadius: "50%",
                mx: 2,
              }}
              onClick={() => navigate("/")}
            >
              <MusicNoteIcon
                sx={{ color: "primary.contrastText", fontSize: "1.5rem" }}
              />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: "background.paper",
              borderRadius: "50px",
              px: 2,
              py: 0.6,
              flexGrow: 1,
              margin: "5px",
              maxWidth: "70%",
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
                value={{ city: location.city, state: location.state }}
                error={error}
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
            <Box
              sx={{
                width: "1px",
                backgroundColor: "primary.main",
                height: "24px",
                mx: 1,
              }}
            />
            <TextField
              label={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <SearchOutlinedIcon sx={{ size: "small" }} />
                  Keyword
                </span>
              }
              variant="outlined"
              value={keyword}
              onChange={handleKeywordChange}
              InputProps={{ sx: { fontSize: "0.9rem" } }}
              InputLabelProps={{ sx: { fontSize: "0.9rem" } }}
              sx={{ width: "45%" }}
            />
            {/* Search Icon */}
            <IconButton
              onClick={handleSearch}
              sx={{
                color: "primary.main",
                mx: 0.5,
                backgroundColor: "primary.main",
                marginLeft: "8px",
              }}
            >
              <SearchIcon sx={{ color: "primary.contrastText" }} />
            </IconButton>
          </Box>
        </Box>
        {/* Middle Icons and Location Picker */}

        {!isLoggedIn && (
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              style={{ color: "white" }}
            >
              Login
            </Link>
            <Button
              variant="contained"
              sx={{
                whiteSpace: "nowrap",
                backgroundColor: "background.paper",
                color: "text.primary",
                textTransform: "none",
                ml: 2,
                px: 4,
                borderRadius: "25px",
                "&:hover": { backgroundColor: "#323232" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                component={RouterLink}
                to="/signup"
                variant="body2"
                style={{ color: "white" }}
              >
                Sign Up
              </Link>
            </Button>
          </Box>
        )}
        {isLoggedIn && (
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "nowrap",
                color: "text.primary",
                mx: 2,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              <Button
                onClick={handleMyPlanner}
                variant="body2"
                sx={{
                  color: "white",
                  "&.MuiButton-root": {
                    textTransform: "none",
                    fontSize: "1.2rem",
                  },
                }}
              >
                My Planner
              </Button>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                fontSize: ".5rem",
                cursor: "pointer",
                borderLeft: "1px solid white",
                paddingLeft: "1rem",
              }}
            >
              <Button
                onClick={handleLogout}
                variant="body2"
                sx={{
                  color: "white",
                  "&.MuiButton-root": {
                    textTransform: "none",
                    fontSize: "1.2rem",
                  },
                }}
              >
                Logout
              </Button>
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
