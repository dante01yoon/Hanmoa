import React, { FC } from "react"; 
import Loading, { LoadingProps } from "./index";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; 
  height: 30px;
  margin-top: 10px;
`;

interface PageLoadingProps extends LoadingProps {};

const PageLoading: FC<PageLoadingProps> = ({
  ...restProps
}) => {
  return(
    <StyledWrapper>
      <Loading {...restProps} />
    </StyledWrapper>
  )
}

export default PageLoading;