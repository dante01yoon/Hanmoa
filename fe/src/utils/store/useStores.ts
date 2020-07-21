import { useSelector } from "react-redux";
import {RootState, TRootReducerKey} from "src/store";

const useStores = (key: TRootReducerKey) => {
    return useSelector<RootState>((state ) => state[key]);
}