import axios, { AxiosInstance } from 'axios';
import { BASE_URL, TIMEOUT } from './const/apiConsts';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
});

export const setAuthToken = (token: string | undefined) => {
  axiosInstance.defaults.headers.common['X-Token'] = token;
};
