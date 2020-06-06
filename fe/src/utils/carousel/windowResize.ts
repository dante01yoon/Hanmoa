import { useLayoutEffect, useState, RefObject } from 'react'

/***
 * @function resizeWindow
 * this function is custom hook for grab resizing innerWidth of element.
 * 
 * 
 */
export const resizeWindow: (ref: RefObject<HTMLElement>) => number[]  = (ref) => {
  const [ elementWidth, elementHeight ] = ref.current ?  
    [ref.current.offsetWidth, ref.current.offsetHeight ] :
    [0,0];
  const [size, setSize] = useState([elementWidth, elementHeight]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([elementWidth, elementHeight]);
      console.log(`elementWidth: ${elementWidth}px`);
    };
    updateSize(); 
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  },[]);
  return size;    
};