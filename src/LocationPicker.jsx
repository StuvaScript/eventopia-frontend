import { useState } from "react";
import states from "./util/states";
import { TextField, Select, FormControl, MenuItem, InputLabel, Box, OutlinedInput } from "@mui/material";

const CustomLocationPicker = ({onLocationChange}) => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleCityChange = (event) => {
    const selectedCity = event.target.value; 
    setCity(selectedCity);
    onLocationChange(selectedCity, state); 
  };

  const handleStateChange = (event) => {
    const selectedStateCode = event.target.value; //value is the stateCode 
    setState(selectedStateCode);
    onLocationChange(city, selectedStateCode);
  };

  return (
    <Box display="flex" alignItems="Box" width="25%">
      <TextField
        value={city}
        onChange={handleCityChange}
        fullWidth
        variant="outlined"
        label="City"
      />
      <FormControl fullWidth>
        <InputLabel>State</InputLabel>
        <Select
          value={state}
          onChange={handleStateChange}
          input={<OutlinedInput label="State" />}
        >
          {states.map((stateItem) => (
            <MenuItem key={stateItem.code} value={stateItem.code}>{stateItem.name}</MenuItem> //value(stateCode) will be sent to backend
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomLocationPicker;
