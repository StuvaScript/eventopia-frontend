import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Box, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const CustomDatePicker = (onDateRangeChange) => {
  const [dateRange, setDateRange] = useState([]);

  const handleChange = (newDateRange) => {
    setDateRange(newDateRange);

    console.log("Start Date:", newDateRange[0]?.format("MM/DD/YYYY"));
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
