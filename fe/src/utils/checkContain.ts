import { RefObject, Dispatch} from 'react';

export const checkContain = ( 
  ref: RefObject<HTMLDivElement>, 
  dependency: boolean,
  dispatch: Dispatch<React.SetStateAction<boolean>>,
  e: MouseEvent,
) => {
  if(e.target instanceof HTMLElement && 
    !ref.current?.contains( e.target )){
    dependency && dispatch(false);
  }      
}