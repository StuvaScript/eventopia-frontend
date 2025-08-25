import axios from "axios";

const getData = async (url, config = {}) => {
  try {
    let res = await axios.get(url, {
      ...config,
      withCredentials: true,
    });
    let data = res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getData in ${url} route`);
  }
};

const getAllData = async (url, config = {}) => {
  try {
    let res = await axios.get(url, {
      ...config,
      withCredentials: true,
    });
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

const postData = async (url, requestBody, config = {}) => {
  try {
    let res = await axios.post(url, requestBody, {
      ...config,
      withCredentials: true,
    });
    let data = res.data;
    return data;
  } catch (error) {
    // TODO server side error messages need to be uniform as they are different for login and signup
    // until then we wil just throw the error back to caller.
    //console.error("Error details:", error.response?.data || error.message);
    //console.log(error, `error - postData in ${url} route`);
    throw error;
  }
};

// ``** Patch **``

// requestBody example
// const requestBody = {
//   data: {
//     firstName: "Finn",
//     lastName: "Williams",
//   },
// };

const patchData = async (url, requestBody, config = {}) => {
  try {
    let res = await axios.patch(url, requestBody, {
      ...config,
      withCredentials: true,
    });
    let data = res.data;
    return data;
  } catch (error) {
    console.error("Error details:", error.response?.data || error.message);
    console.log(error, `error - patchData in ${url} route`);
  }
};

// ``** DELETE **``

const deleteData = async (url, config = {}) => {
  try {
    let res = await axios.delete(url, {
      ...config,
      withCredentials: true,
    });
    let data = res.data;
    return data;
  } catch (error) {
    console.log(error, `error - deleteData in ${url} route`);
  }
};

export { getData, getAllData, postData, patchData, deleteData };
