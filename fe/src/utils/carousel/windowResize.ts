import { useLayoutEffect, useState, RefObject } from 'react'
import debounce from "lodash/debounce";

/***
 * @function resizeWindow
 * this function is custom hook for grab resizing innerWidth of element.
 * 
 * 
 */

const useResize: (ref: RefObject<HTMLElement>) => number  = (
  ref
) => {
  const [size, setSize] = useState<number[]>(
    (() => {
      const [ elementWidth, elementHeight ] = ref.current ?  
      [ref.current.offsetWidth, ref.current.offsetHeight ] :
      [0,0];
      return [elementWidth, elementHeight]; 
    })()
  );
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([ref.current!.offsetWidth, ref.current!.offsetHeight]);
    };
    updateSize(); 
    window.addEventListener('resize', 
      debounce(updateSize, 200),
    );
    return () => window.removeEventListener('resize', debounce(updateSize, 200));
  },[]);
  return size[0];    
};

export default useResize;