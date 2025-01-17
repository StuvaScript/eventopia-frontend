import axios from "axios";
import { fetchCsrfToken } from "./csrfFunction";

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

const postData = async (url, requestBody, config = {}) => {
  try {
    const csrfToken = await fetchCsrfToken();
    console.log({ csrfToken });
    if (!csrfToken) {
      throw new Error("CSRF token could not be fetched. Request aborted.");
    }

    let res = await axios.post(url, requestBody, {
      ...config,
      headers: {
        ...config?.headers,
        "x-csrf-token": csrfToken, // Add CSRF token
      },
      withCredentials: true, // Ensure cookies are sent with the request
    });
    let data = res.data;
    return data;
  } catch (error) {
    // TODO server side error messages need to be uniform as they are different for login and signup
    // until then we wil just throw the error back to csller.
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

const patchData = async (url, requestBody, csrfToken, config) => {
  try {
    const csrfToken = await fetchCsrfToken();
    console.log({ csrfToken });
    if (!csrfToken) {
      throw new Error("CSRF token could not be fetched. Request aborted.");
    }

    let res = await axios.patch(url, requestBody, {
      ...config,
      headers: {
        ...config?.headers,
        "x-csrf-token": csrfToken, // Add CSRF token
      },
      // withCredentials: true, // Ensure cookies are sent with the request
    });
    let data = res.data;
    return data;
  } catch (error) {
    console.error("Error details:", error.response?.data || error.message);
    console.log(error, `error - patchData in ${url} route`);
  }
};

// ``** DELETE **``

const deleteData = async (url, csrfToken, config) => {
  try {
    const csrfToken = await fetchCsrfToken();
    console.log({ csrfToken });
    if (!csrfToken) {
      throw new Error("CSRF token could not be fetched. Request aborted.");
    }

    let res = await axios.delete(url, {
      ...config,
      headers: {
        ...config?.headers,
        "x-csrf-token": csrfToken, // Add CSRF token
      },
      // withCredentials: true, // Ensure cookies are sent with the request
    });
    let data = res.data;
    return data;
  } catch (error) {
    console.log(error, `error - deleteData in ${url} route`);
  }
};

export { getData, getAllData, postData, patchData, deleteData };
