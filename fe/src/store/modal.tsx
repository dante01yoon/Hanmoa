import React, { 
  FC, 
  createContext,
  Dispatch,
  useReducer,
} from 'react';
import { ModalProps } from 'src/models/modal';
import { CardData } from 'src/models/card';


type ModalState = ModalProps; 
// action 
type Action = 
  | { type: 'OPEN' , payload: ModalState}
  | { type: 'CLOSE' , payload: ModalState} ;
// dispatch 
type ModalDispatch = Dispatch<Action>;

export const StateContext = createContext<ModalProps | null>(null);
export const DispatchContext = createContext<ModalDispatch | null>(null);

const {Provider, Consumer } = StateContext;

function modalReducer(state: ModalState, action: Action){
  switch(action.type){
    case 'OPEN':
      return {
        data: action.payload.data,
        visible: true
      }
    case 'CLOSE':
      return{
        ...state,
        visible: false 
      }
    default:
      throw  new Error(`none existing type error ${action}`)
  }
}

const initialState: ModalState = {
  data: {} as CardData, 
  visible: false,
}

export const ModalProvider:FC = ({
  children
}) => {
  const [ state, dispatch ] = useReducer(modalReducer, initialState);
  return(
    <Provider value={ state }>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Provider>
  )
}