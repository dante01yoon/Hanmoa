import React, {FC, SyntheticEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as Styled from './style';
import { BaseButton } from '@components/button'; 
import GoogleIcon from 'src/asset/google.svg'; 
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
  const getGoogleAuth = () => {
    push('/googleLogin');
  }
  return(
    <Wrapper>
      <IconWrapper>
        <GoogleIcon/> 
      </IconWrapper>  
      <ButtonContainer>
        <BaseButton 
          clickHandler={closeModal} 
          background='#28D84F'
          size={88}
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