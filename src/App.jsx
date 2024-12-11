
import React, { useState, useEffect } from 'react';
import CustomLocationPicker from "./LocationPicker";
import { Box } from "@mui/material";  
import { getAllData } from './util/index';

const URL = 'http://localhost:8000/api/v1/';

function App() {

  return (
    <Box display="flex" alignItems="center" gap="10px">
      <CustomLocationPicker />
    </Box>
  );

}

export default App

