import React, { useState, useEffect } from 'react';
import CustomDatePicker from './DatePicker'; 
import { getAllData } from './util/index';

const URL = 'http://localhost:8000/api/v1/';

function App() {

  return (
      <CustomDatePicker
      />
  );

}

export default App
