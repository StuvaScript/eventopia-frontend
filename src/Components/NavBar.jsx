import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
} from "@mui/material";
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
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [token, setToken] = useState("");
  // const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  // const loc = useLocation();
  // const data = loc.state;

  // useEffect(() => {
  //   //Set the logged in status
  //   if (data) {
  //     setIsLoggedIn(data.isLoggedIn);
  //     setToken(data.token);
  //     setName(data.name);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [data]);

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

    const config = {
      params: {
        dateRangeStart: dateRange[0],
        dateRangeEnd: dateRange[1],
        keyword: keyword,
      },
    };

    console.log("Request URL:", URL);
    console.log("Request Config:", config);

    // Validate if city and state are filled
    if (!location.city || !location.state) {
      setError({
        city: !location.city,
        state: !location.state,
      });
      return; //early exit if validation fails
    } else {
      setError({
        city: false,
        state: false,
      });
    }

    // Add API call to execute the search
    try {
      const response = await getData(URL, config);
      console.log(response);
      const inputData = {
        city: location.city,
        state: location.state,
        token: data?.token,
        name: name?.name,
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

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   data.isLoggedIn = null;
  //   data.city = null;
  //   data.state = null;
  //   navigate("/home", { state: [] });
  // };

  // const handleMyPlanner = () => {
  //   navigate("/myplanner", { state: data });
  // };

  const handleMyPlanner = () => {
    navigate("/myplanner");
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

            {/* <IconButton
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
            </IconButton> */}
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
            {/* <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                mx: 2,
                fontSize: "1rem",
                cursor: "pointer",
                paddingLeft: "1rem",
              }}
            ></Typography> */}
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
                // py: 1.5,
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
                // paddingLeft: "1rem",
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
                // mx: 3,
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
