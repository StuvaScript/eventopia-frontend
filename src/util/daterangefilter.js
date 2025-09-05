import React, { useState } from "react";

// Get the start and end of today
const getTodayRange = () => {
  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0)); // set to 12 AM
  const endOfToday = new Date(today.setHours(23, 59, 59, 999)); // set to 11:59 PM
  return { start: startOfToday, end: endOfToday };
};

// Get the start and end of this week (Sunday to Saturday)
const getThisWeekRange = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
  endOfWeek.setHours(23, 59, 59, 999);

  return { start: startOfWeek, end: endOfWeek };
};

// Get the start and end of next week (Sunday to Saturday)
const getNextWeekRange = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfNextWeek = new Date(today);
  startOfNextWeek.setDate(today.getDate() + (7 - dayOfWeek)); // Next Sunday
  startOfNextWeek.setHours(0, 0, 0, 0);

  const endOfNextWeek = new Date(startOfNextWeek);
  endOfNextWeek.setDate(startOfNextWeek.getDate() + 6); // Saturday
  endOfNextWeek.setHours(23, 59, 59, 999);

  return { start: startOfNextWeek, end: endOfNextWeek };
};

// Get the start and end of this month
const getThisMonthRange = () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
  return { start: startOfMonth, end: endOfMonth };
};

// Get the start and end of next month
const getNextMonthRange = () => {
  const today = new Date();
  const startOfNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  );
  const endOfNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    0,
    23,
    59,
    59,
    999
  );
  return { start: startOfNextMonth, end: endOfNextMonth };
};

// Function to get the date range for given filter
const getRangeFilter = (filter) => {
  // Define the range based on the selected filter
  let range;
  switch (filter) {
    case "thisweek":
      range = getThisWeekRange();
      break;
    case "nextweek":
      range = getNextWeekRange();
      break;
    case "thismonth":
      range = getThisMonthRange();
      break;
    case "nextmonth":
      range = getNextMonthRange();
      break;
    default:
      range = getTodayRange();
  }
  return range;
};

export { getRangeFilter };
