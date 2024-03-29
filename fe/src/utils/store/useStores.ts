import { useContext } from "react";
import { useSelector, } from "react-redux";
import { MobXProviderContext } from "mobx-react";
import { RootState } from "src/store";
import { ReducedStore } from "@store/u";
import { http } from "@apis/httpModule";
import { useSocketContext } from "@store/SocketStore";
import { useToast } from "@store/toast";

const useStores = (selectedState: keyof RootState): RootState[typeof selectedState] => useSelector((state: RootState) => state[selectedState]);

export { useToast };
export default useStores;

export interface MobxStores {
  chatStore: ReducedStore["chatStore"];
  topicStore: ReducedStore["TopicStore"];
  sessionStore: ReducedStore["sessionStore"];
  roomStore: ReducedStore["roomStore"];
  http: typeof http;
}

export const useMobxStores = () => {
  const store = useContext(MobXProviderContext);
  if (!store) {
    throw new Error();
  }
  return store;
}

export const useSocket = useSocketContext;

