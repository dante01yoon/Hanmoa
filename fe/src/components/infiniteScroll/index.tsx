import React, { FC, RefObject } from "react";
import styled from "styled-components";

const StyledLoadMore = styled.div`
  height: 1px;
  visibility: none;
`;

interface InfiniteScrollProps {
  targetRef: RefObject<HTMLDivElement>
}

const InfiniteScroll: FC<InfiniteScrollProps> = ({
  targetRef,
}) => {


  return (
    <StyledLoadMore ref={targetRef} />
  )
}

export default InfiniteScroll;