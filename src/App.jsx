import React, { useState, useEffect } from 'react';
import CustomDatePicker from './DatePicker'; 
import { getAllData } from './util/index';

const URL = 'http://localhost:8000/api/v1/';

function App() {
  
  const [message, setMessage] = useState(''); 
  const [range, setRange] = useState([null, null]);

  const handleDateRangeChange = (newDateRange) => {
    setRange(newDateRange);
  };


  useEffect(() => {

    (async () => {
      const myData = await getAllData(URL)
      setMessage(myData.data);
    })();
      
    return () => {
      console.log('unmounting');
    }

  }, []);

  return (
      <CustomDatePicker
        onRangeChange={handleDateRangeChange}
        selectedDateRange={range}
      />
  );

}

export default App
