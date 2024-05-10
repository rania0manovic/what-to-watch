import axios from "axios";

const baseURL = "https://api.themoviedb.org/3/";

const httpClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

httpClient.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] =
      "Bearer " +
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTUwMjYwZWFjN2M0NDc4YTExMzUyYWNmOTI2MDg4YiIsInN1YiI6IjY2MzY1OTk5YzYxNmFjMDEyMjFhODQyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S8CCFqI22wBvY9YP1NG_AxcPeBV6RidkZu0i9yoADbY";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

const api = (axiosInstance) => {
  const baseUrl = baseURL;
  return {
    get: async (url, config = {}) => {
      try {
        const response = await axiosInstance.get(baseUrl + url, config);
        return response.data;
      } catch (error) {
        console.error("GET request failed:", error);
        throw error;
      }
    },
    delete: async (url, config = {}) => {
      try {
        const response = await axiosInstance.delete(baseUrl + url, config);
        return response.data;
      } catch (error) {
        console.error("DELETE request failed:", error);
        throw error;
      }
    },
    put: async (url, body, config = {}) => {
      try {
        const response = await axiosInstance.put(baseUrl + url, body, config);
        return response.data;
      } catch (error) {
        console.error("PUT request failed:", error);
        throw error;
      }
    },
    post: async (url, body, config = {}) => {
      try {
        const response = await axiosInstance.post(baseUrl + url, body, config);
        return response.data;
      } catch (error) {
        console.error("POST request failed:", error);
        throw error;
      }
    },
  };
};

const httpSmartClient = api(httpClient);

export { httpSmartClient, httpClient };
