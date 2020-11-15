import { Request } from "express";
import BasicStore from "@store/BasicStore";

const makeFetchStoreOnServer = (cb: Function) => 
  (req?: Request, store?: {[key: string]: BasicStore}, params?: any) => {
    cb(req, store,params);
}

export default makeFetchStoreOnServer;