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
  ...restProps
}) => {
  const { name, touched, errors } = restProps;
  console.log("name: ", name);
  console.log("touched: ", touched);
  console.log("errors: ", errors);
  return (
    <>
      <FormikField {...restProps} as={StyledInput}/>
      {errors && errors[name] && <StyledErrorField>{errors[name]}</StyledErrorField>}
    </>
  )
}

export default Field;