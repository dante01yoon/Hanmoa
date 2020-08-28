import React, {useRef } from "react";

export interface IIntersectionOptions{
  root?: React.ReactNode;
  rootMargin?: number;
  threshold?: number[] | number;
}

interface IUseInfiniteScrollParams {
  cb: IntersectionObserverCallback;
  options?: IntersectionObserverInit 
}

const defaultOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "0",
  threshold: 0
}
const useInfiniteScroll= ({cb, options = defaultOptions} : IUseInfiniteScrollParams) => {
  const io = useRef<IntersectionObserver>();

  io.current = new IntersectionObserver(cb, options);
  

  return io; 
}


const InfiniteScroll = ({}) => {
  
}