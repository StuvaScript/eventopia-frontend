import { Box, Typography, Button } from "@mui/material";

//for My Planner Page
{/* <EmptyList
  icon={<CalendarTodayIcon sx={{ fontSize: 200 }} />}
  message="Your planner is empty right now, but that's okay—it's just waiting for you to fill it with your exciting events!"
  buttonText="Explore Events >>"
/>; */}

//for Liked List Page
{
  /* <EmptyList
  icon={<FavoriteIcon sx={{ fontSize: 200 }} />}
  message="No events liked yet? Start liking events, and they'll appear here for easy access later!"
  buttonText="Explore Events >>"
/>; */
}

//for Event Search Page
{
  /* <EmptyList
  icon={<FindInPageIcon sx={{ fontSize: 200 }} />}
  message="Sorry, we couldn't find any events matching your search criteria. Try adjusting your filters or search again later!"
  buttonText="Explore More Events >>"
/>; */
}

const EmptyList = ({ icon, message, buttonText, onClick }) => {
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
      <Button sx={{ textDecoration: "underline",  fontSize: 18}}>{buttonText}</Button>
    </Box>
  );
};
export default EmptyList;
