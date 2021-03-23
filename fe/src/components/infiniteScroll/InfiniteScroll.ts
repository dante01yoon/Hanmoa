import React, {useState, useRef, useEffect,Dispatch, SetStateAction, RefObject, ReactNode } from "react";
import isNil from "lodash/isNil";

export interface IIntersectionOptions{
  root?: React.ReactNode;
  rootMargin?: number;
  threshold?: number[] | number;
}

interface IUseInfiniteScrollParams {
  target: RefObject<Element>
  cb: () => any;
  options?: IntersectionObserverInit;
}

const defaultOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: 0
}

const useInfiniteScroll = ( parameters: IUseInfiniteScrollParams) => {
  const {target, cb, options = defaultOptions} = parameters; 

  const io = useRef<IntersectionObserver>();
  
  useEffect(() => {
    io.current = new IntersectionObserver( ([{isIntersecting}]) => {
      if(isIntersecting){
        cb();
      }
    }, options);

    if(target && target.current){
      io.current.observe(target.current);
    }
    return (() => {
      io.current?.disconnect();
    })
  },[target]);
}

export default useInfiniteScroll;