import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Box, InputAdornment, TextField } from "@mui/material";
import dayjs from "dayjs"; 
import { useState } from "react";

const CustomDatePicker = ({onDateRangeChange}) => {
  const [dateRange, setDateRange] = useState([]);

  const handleChange = (newDateRange) => {
    const [startDate, endDate] = newDateRange;

    // Automatically fill the missing date
    if (startDate && !endDate) {
      newDateRange[1] = startDate; 
    } else if (!startDate && endDate) {
      newDateRange[0] = endDate; 
    }

    const formattedStartDate = startDate ? startDate.format("YYYY-MM-DD") : "";
    const formattedEndDate = endDate ? endDate.format("YYYY-MM-DD") : "";
    setDateRange(newDateRange);
    onDateRangeChange([formattedStartDate, formattedEndDate]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          ".css-i31di5-MuiFormControl-root-MuiTextField-root": {
            marginLeft: "0px",
          },
          "& .MuiTypography-root.MuiTypography-body1.MuiMultiInputDateRangeField-separator":
            {
              display: "none", //hide separator
            },
        }}
        value={dateRange}
        localeText={{
          start: (
            <>
              <CalendarTodayIcon
                sx={{ paddingRight: "4px", verticalAlign: "middle" }}
              />
              Start Date
            </>
          ),
          end: (
            <>
              <CalendarTodayIcon
                sx={{ paddingRight: "4px", verticalAlign: "middle" }}
              />
              End Date
            </>
          ),
        }}
        onChange={handleChange}
        format={"MM/DD/YYYY"}
        minDate={dayjs()} // Disable past dates
        slotProps={{
          textField: {
            variant: "outlined",
            sx: {
              "& .MuiInputLabel-root": { fontSize: "0.9rem" },
              "& .MuiInputBase-input": { fontSize: "0.9rem" },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
export default CustomDatePicker;
