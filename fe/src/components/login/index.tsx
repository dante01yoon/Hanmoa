import React, {FC, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux'; 
import { withRouter, RouteComponentProps } from 'react-router-dom';
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
  history : { push },
  closeModal
}) => {
  const dispatch = useDispatch(); 
  const getGoogleAuth = (e: SyntheticEvent) => {
    dispatch(LoginFetch());
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