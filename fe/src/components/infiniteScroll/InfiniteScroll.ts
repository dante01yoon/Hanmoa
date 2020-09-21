import React, {useState, useRef, useEffect,Dispatch, SetStateAction, RefObject } from "react";

export interface IIntersectionOptions{
  root?: React.ReactNode;
  rootMargin?: number;
  threshold?: number[] | number;
}

interface IUseInfiniteScrollParams<T> {
  target: RefObject<Element>
  cb: () => any;
  options?: IntersectionObserverInit;
}

const defaultOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "0",
  threshold: 0
}

const useInfiniteScroll = <S>( parameters: IUseInfiniteScrollParams<S>) => {
  const {target, cb, options = defaultOptions} = parameters; 

  const io = useRef<IntersectionObserver>();
  
  useEffect(() => {
    io.current = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting){
        cb();
      }
      // io.current?.observe();
    }, options);

    return (() => {
      io.current?.disconnect();
    })
  },[target]);
}
   
export default useInfiniteScroll;