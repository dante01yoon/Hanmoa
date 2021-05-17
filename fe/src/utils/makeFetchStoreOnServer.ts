import { Request } from "express";
import BasicStore from "@store/BasicStore";
import { MobxStores } from "@utils/store/useStores";

export type InitStoreOnServer<S = Partial<MobxStores>, P = any> = (req: Request<P>, stores: S, params?: any) => Promise<any>

const makeFetchStoreOnServer =
  (req?: Request, store?: { [key: string]: BasicStore }, params?: any) => {

  }

export default makeFetchStoreOnServer;