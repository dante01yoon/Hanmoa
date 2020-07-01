import useContactForm from '@utils/form/useContactForm';

import {useFormik, FormikProps } from 'formik';
import React, { FC, useState, FormEvent } from 'react';
import { useDispatch} from 'react-redux';
import styled from 'styled-components';

const StyledFormList = styled.ul<{
  valid: boolean
}>`
  
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

const Form: FC<IFormProps & FormikProps<IFormValues>> = ({
  message, 
  onSubmit
}) => {
  const { initialValues, handleSubmit } = useContactForm();
  const customHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(e);
    handleSubmit(); 
  }
  const formik = useFormik({
    initialValues,
    onSubmit: customHandleSubmit
  });
  
  return(
    <form onSubmit={formik.onSubmit}>
      <article>
        <StyledFormList>

        </StyledFormList>
      </article>
      <article>
        
      </article>
    </form>
  )
}

export default Form; 