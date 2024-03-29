import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { APIResponse } from './types';

const baseURL = process.env.BASE_URL ?
  `${process.env.BASE_URL}/api` :
  'http://localhost:5001/api';

const hanmoaAxios: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    "Accept": "*",
  },
  withCredentials: true,
})

hanmoaAxios.interceptors.request.use((config: any) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

const request = async<T>(config: AxiosRequestConfig): Promise<APIResponse<T>> => {
  let moreHeaders: {
    [headerName: string]: string
  } = {
    ...config.headers,
  };
  try {
    // headers: moreHeaders 
    const { data } = await hanmoaAxios.request({ ...config, headers: moreHeaders });

    return [undefined, data];
  } catch (error) {
    // TODO error type 지정
    if (error.response) {
      throw [{
        status: error.response.status,
        success: error.response.data.success,
        ...error.response.data.data,
      }, undefined];
    }
    throw [error, undefined];
  }
}

export const GET = <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<APIResponse<T>> =>
  request({ ...config, method: 'GET', url, params });

export const POST = <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<APIResponse<T>> =>
  request({ ...config, method: 'POST', url, data });

export const PUT = <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<APIResponse<T>> =>
  request({ ...config, method: 'PUT', url, data });

export const DELETE = <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<APIResponse<T>> =>
  request({ ...config, method: 'DELETE', url, data });

export const http = {
  GET,
  POST,
  PUT,
  DELETE,
};