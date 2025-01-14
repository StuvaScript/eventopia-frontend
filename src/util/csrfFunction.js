import axios from "axios";

// let csrfToken = null;

export const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/csrf-token`,
      {
        withCredentials: true, // Include cookies in the request
      }
    );
    // csrfToken = response.data.csrfToken;
    console.log("CSRF Token fetched:", response.data.csrfToken);

    return response.data.csrfToken;
  } catch (error) {
    console.error(
      "Error fetching CSRF token:",
      error.response?.data || error.message
    );
  }
};
