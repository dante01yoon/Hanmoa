import React, { FC, useEffect } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  background-color: #252525;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
`;

const StyledTitleBox = styled.div`
  color: white;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.2px;
  line-height: 18px;
  margin: 0 auto;
`;

const StyledMessageBox = styled.div`
  color: ${({ theme }) => theme.colors.gray_100};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.2px;
  line-height: 18px;
  margin: 10px auto 0;
`;


interface DefaultToastProps {
  title?: string;
  message?: string;
  className?: string;
}


const DefaultToast: React.FC<DefaultToastProps> = ({
  title,
  message,
  className = "",
}) => {
  return (
    <StyledWrapper className={className}>
      {title && (<StyledTitleBox>{title}</StyledTitleBox>)}
      {message && (
        <StyledMessageBox>
          {message}
        </StyledMessageBox>
      )}
    </StyledWrapper>
  )
}

export default DefaultToast;