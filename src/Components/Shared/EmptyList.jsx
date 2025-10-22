import { Box, Typography, Button } from "@mui/material";

const EmptyList = ({ icon, message, buttonText }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{ padding: 18 }}
    >
      <Box sx={{ fontSize: 150, color: "primary.main", marginBottom: 2 }}>
        {icon}
      </Box>
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
      <Button sx={{ textDecoration: "underline", fontSize: 18 }}>
        {buttonText}
      </Button>
    </Box>
  );
};
export default EmptyList;
