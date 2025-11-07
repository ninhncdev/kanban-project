import axiosClient from "./axiosClient";

const handleApi = async (
  url: string,
  data?: any,
  method?: "post" | "put" | "get" | "delete",
  config?: any
) => {
  return await axiosClient(url, { method: method ?? "get", data, ...config });
};

export default handleApi;
