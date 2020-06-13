import axios, { AxiosInstance, AxiosRequestConfig} from 'axios'; 
import { APIResponse } from './APIResponse';

const baseURL = 'http://localhost:5001'; 

const hanmoaAxios: AxiosInstance = axios.create({
  baseURL
})

const request = async<T>(config:AxiosRequestConfig): Promise<APIResponse<T>> => {
  try{
    const {data} = await hanmoaAxios.request(config); 
    return [undefined, data];
  } catch(error){
    return [error, undefined];
  }
} 

const GET = <T>(url: string, params?: object, config?:AxiosRequestConfig): Promise<APIResponse<T>> => 
  request({...config, method: 'GET', url,params});

const POST = <T>(url: string, params?: object, config?:AxiosRequestConfig): Promise<APIResponse<T>> =>
  request({...config, method: 'POST', url,params});
  
export const http = {
  GET,
  POST
}