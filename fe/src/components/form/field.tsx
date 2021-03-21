import React, { FC, useEffect, useCallback, InputHTMLAttributes } from "react";
import { Field as FormikField, FieldAttributes } from "formik";
import styled from "styled-components";

interface CustomFieldProps extends FieldAttributes<any> {
  errorMessages?: string;
  isError?: boolean;
}

const StyledInput = styled.input`
  background-color: ${({theme}) => theme.colors.whiteGray};
  font-size: 15px;
  width: 195px;
  height: 48px;
  padding: 10px 15px;
  border: 0;
  border-radius: 15px;
`;

const StyledErrorField = styled.div`
  margin-top: 2px;
`;

const Field: FC<CustomFieldProps> = ({
  isError,
  errorMessages,
  ...restProps
}) => {
  
  return (
    <>
      <FormikField {...restProps} as={StyledInput}/>
      {isError && <StyledErrorField>{errorMessages}</StyledErrorField>}
    </>
  )
}

export default Field;