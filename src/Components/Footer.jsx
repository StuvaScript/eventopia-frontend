import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backdropFilter: "blur(8px)",
        backgroundColor: alpha(theme.palette.primary.main, 0.7),
        // backgroundColor: "primary.main",
        color: "primary.contrastText",
        textAlign: "center",
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <Typography variant="body4">
        © {new Date().getFullYear()} Eventopia
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Aligns "Follow Us" and icons vertically
        }}
      >
        <Typography variant="body4" sx={{ marginRight: 1 }}>
          Follow Us
        </Typography>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <IconButton color="inherit">
            <FacebookIcon />
          </IconButton>
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <IconButton color="inherit">
            <InstagramIcon />
          </IconButton>
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <IconButton color="inherit">
            <TwitterIcon />
          </IconButton>
        </a>
      </Box>
    </Box>
  );
};

export default Footer;
