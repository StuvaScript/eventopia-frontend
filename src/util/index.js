import axios from "axios";

const getData = async (url, config) => {
  try {
    let res = await axios.get(url, config);
    let data = res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getData in ${url} route`);
  }
};

const getAllData = async (url) => {
  try {
    let res = await axios.get(url);
    let data = res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getAllData in ${url} route`);
  }
};


// ``** POST **``

// requestBody example
// const requestBody = {
//   data: {
//     firstName: "Finn",
//     lastName: "Williams",
//   },
// };

const postData = async (url, requestBody, config) => {
  try {
    let res = await axios.post(url, requestBody, config);
    let data = res.data;
    return data;
  } catch (error) {
    console.log(error, `error - postData in ${url} route`);
  }
};

// ``** DELETE **``

const deleteData = async (url, config) => {
  try {
    let res = await axios.delete(url, config);
    let data = res.data;
    return data;
  } catch (error) {
    console.log(error, `error - deleteData in ${url} route`);
  }
};

export { getData, getAllData, postData, deleteData };