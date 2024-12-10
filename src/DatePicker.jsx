import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from '@mui/material';
import { useState } from "react";

const CustomDatePicker = () => {
  const [dateRange, setDateRange] = useState([]);

  const handleChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box width="25%">
        <DateRangePicker
          value={dateRange}
          localeText={{ start: "Start Date", end: "End Date" }}
          onChange={handleChange}
          format={"MM/DD/YYYY"}
          slotProps={{ textField: { variant: "outlined" }}}
        />
      </Box>
    </LocalizationProvider>
  );
};
export default CustomDatePicker;
