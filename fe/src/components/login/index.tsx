import React, {FC, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux'; 
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import * as Styled from './style';
import GoogleIcon from 'src/asset/google.svg'; 
import { BaseButton } from '@components/button'; 
import { LoginFetch } from '@store/user';

const {
  Wrapper,
  IconWrapper,
  ButtonContainer
} = Styled; 
interface Props {
  closeModal : (e:SyntheticEvent) => void;
}

const LoginModal:FC<Props & RouteComponentProps> = ({
  history,
  closeModal
}) => {
  const dispatch = useDispatch(); 
  const getGoogleAuth = (e: SyntheticEvent) => {
    const googleAuthHost = process.env.GOOGLE_AUTH;
    const params = [
      `client_id=${process.env.GOOGLE_CLIENT_ID}`,
      `scope=${process.env.GOOGLE_SCOPE}`,
      `response_type=${process.env.GOOGLE_RESPONSE_TYPE}`,
      `redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` 
    ].join("&");
    console.log(`${googleAuthHost}${params}`); 
    return window.location.assign(`${googleAuthHost}${params}`); 
  }
  return(
    <Wrapper>
      <IconWrapper>
        <GoogleIcon/> 
      </IconWrapper>  
      <ButtonContainer>
        <BaseButton 
          background='#28D84F'
          size={88}
          clickHandler={getGoogleAuth}
        > 로그인</BaseButton>
        <BaseButton 
          clickHandler={closeModal} 
          background='#DC3943'
          size={88}
        > 취소</BaseButton>
      </ButtonContainer>
    </Wrapper>
  )
}
export default withRouter(LoginModal); 