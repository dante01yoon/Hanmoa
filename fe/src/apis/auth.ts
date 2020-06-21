import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { http } from './httpModule';

const googleAuth: AxiosInstance = axios.create({
  baseURL: 'https://accounts.google.com/o/oauth2/v2/auth/'
})

const request = async(config: AxiosRequestConfig) => {
  try{
    const { data } = await googleAuth.request(config);
    return [ undefined, data ]; 
  } catch(error) {
    return [ error, undefined ] ;
  }
}

type GoogleAuthParam = {
  client_id: string,
  redirect_uri: string,
  response_type: string,
  scope: string 
}

const GET = (url: string, params: GoogleAuthParam, config?: AxiosRequestConfig) => 
  request({...config, method: "GET", url, params});

export const googleAuthRequest = () => GET('', {
  client_id : process.env.CLIENT_ID!,
  redirect_uri: process.env.CLIENT_SECRET!, 
  response_type: 'token&',
  scope: 'openid profile email'
})

