import React, { FC, useState, FormEvent } from 'react';
import {useFormik} from 'formik';

import styled from 'styled-components';

interface IFormProps {
  submitForm : ( e: FormEvent<HTMLFormElement> ) => Promise<void>; 
}
export const Form: FC<IFormProps> = ({
  submitForm
}) => {
  const formik = useFormik({
    initialValues : {
      email: '',
      password: '',
    },
    onSubmit: submitForm
      
    }
  })      
}