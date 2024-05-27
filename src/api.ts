import axios, { AxiosInstance } from 'axios';
import { BASE_URL, TIMEOUT } from './const/api-const';

const API_TOKEN_KEY = 'six-cities-token';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(API_TOKEN_KEY);
    if (token) {
      config.headers['X-token'] = token;
    }
    return config;
  }
);

export const setAuthToken = (token: string | undefined) => {
  if(token){
    localStorage.setItem(API_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(API_TOKEN_KEY);
  }
};
