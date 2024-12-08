import axios from "axios";

// ``** GET **``

// GET params example
const params = {
  params: {
    ID: 12345,
  },
};

// note: not used, but could be used with GET with params
const getData = async (url, params) => {
  try {
    let res = await axios.get(url, params);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getData in ${url} route`);
  }
};

const getAllData = async (url) => {
  try {
    let res = await axios.get(url);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getAllData in ${url} route`);
  }
};

// ``** POST **``

// requestBody example
const requestBody = {
  data: {
    firstName: "Finn",
    lastName: "Williams",
  },
};

// headers example
const headers = {
  headers: {
    myCustomHeader1: "value1",
    myCustomHeader2: "value2",
    "content-type": "application/json",
    authorization: "Bearer your_token",
  },
};

const postData = async (url, requestBody, headers) => {
  try {
    let res = await axios.post(url, requestBody, headers);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - postData in ${url} route`);
  }
};

// ``** DELETE **``

const deleteData = async (url, requestBody, headers) => {
  try {
    let res = await axios.delete(url, requestBody, headers);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - deleteData in ${url} route`);
  }
};

export { getData, getAllData, postData, deleteData };
