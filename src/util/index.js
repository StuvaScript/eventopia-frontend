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

const postData = async (url, requestBody, config = {}) => {
  try {
    let res = await axios.post(url, requestBody, {
      ...config,
      withCredentials: true,
    });
    let data = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

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
