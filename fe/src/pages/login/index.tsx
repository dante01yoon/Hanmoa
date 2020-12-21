import React,  { FC, useEffect, useState } from 'react';
import styled from "styled-components";
import { useMobxStores } from "@utils/store/useStores";
import google_auth from "src/asset/google_auth.svg";

interface AuthResponse {
  authUser: string;
  code: string;
  hd: string;
  prompt: string;
  scope: string;
}

const StyledSection = styled.section`
  background-color: ${({theme}) => theme.colors.light};
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
  const { sessionStore, api } = useMobxStores();

  useEffect(() => {
    console.log("sessionStore: ", sessionStore); 
    console.log("apiStore: ", api);
    window.gapi.load('auth2', () => {
      setGapiReady(true); 
    })
  },[]);

  const openGoogleAuth = ():Promise<string> => {
    let accessCode = null;
    if( gapiReady ) {
      return new Promise((resolve) => {
        window.gapi.auth2.authorize({
          client_id: process.env.CLIENT_ID,
          scope: "profile email openid",
          response_type: process.env.RESPONSE_TYPE,
          hosted_domain: "handong.edu",
        },(response: gapi.auth2.AuthorizeResponse & {hd?: string} ) => {
          console.log(response);
          if(!response.hd){
            alert('handong@edu 이메일이 아닙니다.')
          }
          accessCode = response.code;
          resolve(accessCode);
        })
      })
    }
    return new Promise(resolve => resolve("error"));
  }
  
  const onAfterGetGoogleAuthCode = async (accessCode: string | null) => {
    if(accessCode){
      const response = await sessionStore.fetchSignIn(accessCode);
      console.log("response:", response);
    }
  }

  const handleGoogleLoginClick = async() => {
    const accessCode = await openGoogleAuth();
    console.log(accessCode); 
    const wow = await onAfterGetGoogleAuthCode(accessCode);
  }
  
  return(
    <StyledSection>
      <StyledLoginWrapper>
        <StyledTitle>로그인</StyledTitle> 
        <StyledGoogleLoginBox onClick={handleGoogleLoginClick} gapiBlock={!gapiReady}>
          <StyledIcon src={google_auth} /> 
          구글로 계속하기
        </StyledGoogleLoginBox>
      </StyledLoginWrapper>
    </StyledSection>
  )
}

export default LoginPage;