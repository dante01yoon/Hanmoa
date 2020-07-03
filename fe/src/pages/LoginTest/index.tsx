import LoginForm from '@components/login/form';
import React, { FC } from 'react';
import { withRouter } from 'react-router'; 
import styled from 'styled-components';

const StyledTitle = styled.h2`
`;
const StyledLoginForm = styled(LoginForm)`
  margin: 0 auto;
  padding: 24px; 

`;
const LoginTest = ({

}) => {
  const customSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  }
  return(
    <section> 
      <StyledLoginForm 
        message={"Please Fill your Login form"}
        onSubmit={customSubmit} 
      />
    </section>
  )
}

export default LoginTest;  