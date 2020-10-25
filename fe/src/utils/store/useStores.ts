import { useContext } from "react"; 
import { useSelector,  } from "react-redux";
import { MobXProviderContext } from "mobx-react"; 
import {RootState} from "src/store";

const useStores = (selectedState : keyof RootState):RootState[typeof selectedState] => useSelector((state:RootState) => state[selectedState]);

export default useStores;

export const useMobxStores = () => {
  const store = useContext(MobXProviderContext);
  if(!store) {
    throw new Error();
  }
  return store;
}


