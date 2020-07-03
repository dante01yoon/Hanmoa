import useContactForm from '@utils/form/useContactForm';
import {useFormik, FormikProps } from 'formik';
import React, { FC, useState, useRef, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import styled from 'styled-components';
import CheckIcon from 'src/asset/check.svg'; 

const StyledFormList = styled.ul`
  
`;

const StyledList = styled.li<{
  
}>`
 & > label {
   display: inline-block;
   width: 64px;
   margin-right: 8px;
 }

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
const StyledInput = styled.input<{
  focus: boolean
}>`
  width: 160px;
  height:32px;
  ${p => p.focus ? `box-shadow: 0 0 24px 0 #bbb;` : ``}
  border: 0;
`;
const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > button {
    border-radius: 8px;
    margin: 8px;
    width: 72px;
    height: 32px;
    border: 1px solid ${p => p.theme.colors.gray700};
    background-color: transparent; 
    transition: all ease-in 0.2ms;  
    :hover {
      background-color: ${p=>p.theme.colors.cyan};
      color: ${p => p.theme.colors.white};
      box-shadow: 
    }
  }
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

interface IFocusState { 
  email: boolean
  password: boolean
}

type TFocusedState = "email" | "password" | "none";

const Form: FC<IFormProps> = ({
  message, 
  onSubmit
}) => {
  const [focus, setFocus] = useState<IFocusState>({
    email: false,
    password: false
  });
  const [focused, setFocused ] = useState("none");

  const { initialValues, handleSubmit } = useContactForm();
  const inputRef = useRef<HTMLInputElement>(null);
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  });
  
  const setFocusExtend = ( param: IFocusState) => {
    const { email, password } = param;
    setFocus(param);
    if( email === true){
      setFocused("email");
    } else {
      setFocused("password");
    }
  }


  useEffect(() => {
    if( inputRef.current ){
      inputRef.current.focus();
      setFocusExtend({
        email: true,
        password: false
      })
    }
   })
  const renderField = () => {
    return(
        <>
          <StyledList key={`_field::email`}>
            <label htmlFor="email">이메일</label>
            <StyledInput 
              ref={inputRef}
              onChange={formik.handleChange}
              name={"email"}
              value={formik.values.email}
              type={"email"}
            />
          </StyledList>
          <StyledList key={`_field::password`}>
            <label htmlFor="password">비밀번호</label>
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
        <StyledButtonContainer> 
          <StyledSubmitButton type="submit"> 등록 </StyledSubmitButton>
          <StyledSubmitButton type="button"> 회원가입 </StyledSubmitButton>
        </StyledButtonContainer>
      </article>
    </form>
  )
}

export default Form; 