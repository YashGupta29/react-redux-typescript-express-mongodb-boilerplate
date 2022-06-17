import axios, { AxiosRequestConfig } from "axios";

import { BASE_API_URL } from "../../constants/env.constants";
import { getObject } from "../localStorage";

class ApiService {
  constructor() {
    axios.interceptors.request.use(async function (config) {
      const token = getObject("token");
      if (!config.headers) {
        throw new Error("Expected `config.headers` to not be undefined");
      }
      if (token) {
        config.headers.authorization = `bearer ${token}`;
        axios.defaults.headers.common["authorization"] = `bearer ${token}`;
      }
      return config;
    });
  }
  get(url: string, config: AxiosRequestConfig = {}) {
    return axios.get(BASE_API_URL + url, config);
  }
  delete(url: string, config: AxiosRequestConfig = {}) {
    return axios.delete(BASE_API_URL + url, config);
  }
  post(
    url: string,
    payload: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ) {
    return axios.post(BASE_API_URL + url, payload, config);
  }
  put(
    url: string,
    payload: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ) {
    return axios.put(BASE_API_URL + url, payload, config);
  }
  patch(
    url: string,
    payload: Record<string, unknown>,
    config: AxiosRequestConfig = {}
  ) {
    return axios.patch(BASE_API_URL + url, payload, config);
  }
  setHeader(headerName: string, value: string) {
    axios.defaults.headers.common[headerName] = value;
  }
  response(isSuccessful: boolean, data: {}, error: string) {
    return { isSuccessful: isSuccessful, data: data, error: error };
  }
}

const apiService = new ApiService();
export default apiService;
