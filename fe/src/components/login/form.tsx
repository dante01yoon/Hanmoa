import useContactForm from '@utils/form/useContactForm';
import {useFormik, FormikProps } from 'formik';
import React, { FC, useState, FormEvent } from 'react';
import { useDispatch} from 'react-redux';
import styled from 'styled-components';
import CheckIcon from 'src/asset/check.svg'; 

const StyledFormList = styled.ul`
  
`;

const StyledList = styled.li<{
  
}>`


`;
const StyledIcon = styled.p<{
  valid: boolean
}>`
  width: 64px;
  height: 64px; 
  ${p => `background: url(${CheckIcon})`};
  background-size: cover;
  background-position: center; 
`; 
const StyledInput = styled.input`
`;
const StyledSubmitButton = styled.button`

`;  
interface IFormValues  {
  email: string;
  password: string; 
}

interface IErrors {
  [key: string]: string;
}

interface IFormProps {
  message: string;
  onSubmit: (e:React.FormEvent<HTMLFormElement>) => void
}

const Form: FC<IFormProps> = ({
  message, 
  onSubmit
}) => {
  const { initialValues, handleSubmit } = useContactForm();
  
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  });
  const renderField = () => {
    return(
        <>
          <StyledList key={`_field::email`}>
            <StyledInput 
              onChange={formik.handleChange}
              name={"email"}
              value={formik.values.email}
              type={"email"}
            />
          </StyledList>
          <StyledList key={`_field::password`}>
            <StyledInput
              onChange={formik.handleChange}
              name={"password"}
              value={formik.values.password}
              type={"password"}
            />
          </StyledList>
        </>
      )
  }
  return(
    <form onSubmit={formik.handleSubmit}>
      <article>
        <StyledFormList>
          {renderField()}
        </StyledFormList>
      </article>
      <article>
        <StyledSubmitButton type="submit"> 등록 </StyledSubmitButton>
        <StyledSubmitButton type="button"> 회원가입 </StyledSubmitButton>
      </article>
    </form>
  )
}

export default Form; 