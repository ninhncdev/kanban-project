import axios from "axios";
import { localDataNames } from "constants/appinfos";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3001",
  paramsSerializer: (params) => queryString.stringify(params),
});

const getAccessToken = () => {
  const res = localStorage.getItem(localDataNames.authData);
  return res ? JSON.parse(res).token : "";
};
axiosClient.interceptors.request.use(async (config: any) => {
  const accessToken = getAccessToken();
  config.headers = {
    Authorization: accessToken,
    Accept: "application/json",
    ...config.headers,
  };
  return config;
});

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response.status >= 200 && response.data && response.status <= 300) {
      return response.data;
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    const { response } = error;
    return Promise.reject(response.data);
  }
);
export default axiosClient;
