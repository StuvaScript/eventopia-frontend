import { useState } from "react";
import states from "./util/states";
import { TextField, Select, FormControl, MenuItem, InputLabel, Box, OutlinedInput } from "@mui/material";

const CustomLocationPicker = ({ onLocationChange }) => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleCityChange = (event) => {
    setCity(event.target.value);
    onLocationChange(event.target.value, state); //sends both city and state to parent
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
    onLocationChange(city, event.target.value);
  };

  return (
    <Box display="flex" alignItems="Box" width="25%">
      <TextField
        value={city}
        onChange={handleCityChange}
        placeholder="Enter City"
        fullWidth
        variant="outlined"
      />
      <FormControl fullWidth>
        <InputLabel>State</InputLabel>
        <Select
          value={state}
          onChange={handleStateChange}
          input={<OutlinedInput label="State" />}
        >
          {states.map((stateName, index) => (
            <MenuItem key={index} value={stateName}>
              {stateName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomLocationPicker;
