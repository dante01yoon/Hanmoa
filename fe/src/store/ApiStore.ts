import RootStore from "./RootStore";
import { AxiosRequestConfig } from "axios"; 
import { GET, POST } from "@apis/httpModule";
import { makeAutoObservable } from "mobx";

class ApiStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this); 
  }
  
  async getJson<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T>{
    const [error, response] = await GET<T>(url, params, config); 
    if( error ) {
      throw new Error(error.error_message);
    }    
    // 위에 에러 처리했기 때문에 
    return response!.data
  }

  async postJson<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T>{
    const [error, response] = await POST<T>(url,params, config);
    if(error){
      throw new Error(error.error_message);
    }
    // 위에 에러 처리했기 때문에
    return response!.data;
  }
}

export default ApiStore;