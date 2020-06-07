import { useLayoutEffect, useState, RefObject } from 'react'

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
      console.log('ref: ', [ref.current!.offsetWidth, ref.current!.offsetHeight]);
      setSize([ref.current!.offsetWidth, ref.current!.offsetHeight]);
    };
    updateSize(); 
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  },[]);
  return size[0];    
};

export default useResize;