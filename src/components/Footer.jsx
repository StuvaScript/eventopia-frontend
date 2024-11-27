import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        textAlign: "center",
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body1">© 2024 App Name</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Aligns "Follow Us" and icons vertically
        }}
      >
        <Typography variant="body1" sx={{ marginRight: 1 }}>
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
