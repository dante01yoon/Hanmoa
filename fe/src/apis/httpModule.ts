import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { APIResponse } from './types';

const baseURL = 'http://localhost:5001/api';

const hanmoaAxios: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    accept: "application/json",
  }
})

const request = async<T>(config:AxiosRequestConfig):Promise<APIResponse<T>> => {
  let moreHeaders: {
    [headerName: string]: string
  } = {
    ...config.headers,
  };
  try{
    const { data } = await hanmoaAxios.request({...config, headers: moreHeaders});
    return [ undefined, data ]; 
  } catch(error){
    return [ error, undefined]; 
  }
}

export const GET = <T>(url: string, params?: object, config?:AxiosRequestConfig): Promise<APIResponse<T>> =>
  request({...config, method: 'GET', url, params });
export const POST = <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<APIResponse<T>> => 
  request({...config, method: 'POST', url, data});

export const http = {
  GET,
  POST
}; 