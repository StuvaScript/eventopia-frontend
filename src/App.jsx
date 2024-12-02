import React, { useState, useEffect } from 'react';
import CustomDatePicker from "./DatePicker"
import { getAllData } from './util/index';

const URL = 'http://localhost:8000/api/v1/';

function App() {
   const [selectedDate, setSelectedDate] = useState(null);

   const handleDateChange = (date) => {
     setSelectedDate(date); 
   };
  
  const [message, setMessage] = useState(''); 

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
    <>
      <h1>{message}</h1>
      <CustomDatePicker
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        placeholder="Select a date"
      />
    </>
  );

}

export default App
