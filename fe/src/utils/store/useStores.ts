import { useSelector, TypedUseSelectorHook } from "react-redux";
import {RootState, TRootReducerKey} from "src/store";

const useStores = (selectedState : keyof RootState):RootState[typeof selectedState] => useSelector((state:RootState) => state[selectedState]);
export default useStores;

