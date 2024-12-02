import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { useState } from "react";

const CustomDatePicker = ({ selectedDate, onDateChange }) => {
  const [date, setDate] = useState(selectedDate || null);

  const handleChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate); //callback func to pass the date to the parent comp
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={date}
        onChange={handleChange}
        dateFormat={"MM/DD/YYYY"}
        renderInput={(params) => (
          <TextField value={date} placeholder={"Select a date"} fullWidth />
        )}
      />
    </LocalizationProvider>
  );
};
export default DatePicker;
