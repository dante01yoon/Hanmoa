import React,  { FC, useEffect, useState } from 'react';
import styled from "styled-components";

import google_auth from "src/asset/google_auth.svg";

const StyledSection = styled.section`
  background-color: ${({theme}) => theme.colors.light};
  height: 80vh;
  padding: 80px 16px;
`;

const StyledLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 8px;
  padding: 40px;
  margin: 0 auto;
  min-width: 200px;
  max-width: 500px;
  min-height: 300px;
`; 

const StyledGoogleLoginBox = styled.div<{
  gapiBlock: boolean; 
}>`
  display: flex;
  color: #333;
  font-size: 17px;
  font-weight: 500;
  line-height: 36px;
  background-color: ${({theme, gapiBlock }) => gapiBlock ? theme.colors.disable: theme.colors.white };
  border: #ccc 1px solid;
  padding: 8px 16px;
  cursor: pointer;
  pointer-events: ${({gapiBlock}) => gapiBlock ? "none" : "auto"};

  &:hover {
    background-color: ${({theme}) => theme.colors.whiteGray};
    opacity: 0.77;
  }
`;

const StyledTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-top: -50px;
  margin-bottom: 70px;
  margin-right: auto;
 
`

const StyledIcon = styled.div<{
  src: string;
}>`
  ${({theme,src}) => theme.functions.setBackground(src)}
  width: 36px;
  height: 36px;
  margin-right: 16px;
`;

const LoginPage: FC =( ) =>{
  const [gapiReady, setGapiReady] = useState(false);

  useEffect(() => {
    console.log("client_id", process.env.CLIENT_ID); 
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: process.env.CLIENT_ID,
        scope: "profile",
      }).then(() => {
        setGapiReady(true);
      })
    })
  },[]);

  const openGoogleAuth = () => {
    if( gapiReady ) {
      window.gapi.auth2.getAuthInstance().signIn();
    }
  }

  return(
    <StyledSection>
      <StyledLoginWrapper>
        <StyledTitle>로그인</StyledTitle> 
        <StyledGoogleLoginBox onClick={openGoogleAuth} gapiBlock={!gapiReady}>
          <StyledIcon src={google_auth} /> 
          구글로 계속하기
        </StyledGoogleLoginBox>
      </StyledLoginWrapper>
    </StyledSection>
  )
}

export default LoginPage;