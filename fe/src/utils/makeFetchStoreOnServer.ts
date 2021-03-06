import { Request } from "express";
import BasicStore from "@store/BasicStore";
import { MobxStores } from "@utils/store/useStores";

export type InitStoreOnServer<S = Partial<MobxStores> > = (req: Express.Request, stores: S) => Promise<any>

const makeFetchStoreOnServer = (cb: Function) => 
  (req?: Request, store?: {[key: string]: BasicStore}, params?: any) => {
    cb(req, store,params);
}

export default makeFetchStoreOnServer;