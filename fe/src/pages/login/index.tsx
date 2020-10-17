import React,  { FC } from 'react';
import styled from "styled-components";

import google_auth from "src/asset/google_auth.svg";

const StyledSection = styled.section`
  background-color: ${({theme}) => theme.colors.light};
  height: 80vh;
  padding: 80px 16px;
`;

const StyledLoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 8px;
  padding: 40px;
  margin: 0 auto;
  min-width: 200px;
  max-width: 500px;
`; 

const StyledGoogleLoginBox = styled.div`
  display: flex;
  color: #333;
  line-height: 36px;
  background-color: ${({theme}) => theme.colors.white};
  border: #ccc 1px solid;
  padding: 4px 8px;
  
`;

const StyledIcon = styled.div<{
  src: string;
}>`
  ${({theme,src}) => theme.functions.setBackground(src)}
  width: 36px;
  height: 36px;
  margin-right: 4px;
`;

const LoginPage: FC =( ) =>{
    return(
      <StyledSection>
        <StyledLoginWrapper>
          <StyledGoogleLoginBox>
            <StyledIcon src={google_auth}/> 
            구글로 계속하기
          </StyledGoogleLoginBox>
        </StyledLoginWrapper>
      </StyledSection>
    )
}

export default LoginPage;