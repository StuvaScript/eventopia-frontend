
import React, { useState, useEffect } from 'react';
import CustomLocationPicker from "./LocationPicker";
import { Box } from "@mui/material";  
import { getAllData } from './util/index';

const URL = 'http://localhost:8000/api/v1/';

function App() {

  const [location, setLocation] = useState({city: "", state: ""})

  const handleLocationChange = (city, state) => {
    console.log(`City: ${city}, State: ${state}`);
  };

  return (
    <Box display="flex" alignItems="center" gap="10px">
      <CustomLocationPicker onLocationChange={handleLocationChange} />
    </Box>
  );

}

export default App

