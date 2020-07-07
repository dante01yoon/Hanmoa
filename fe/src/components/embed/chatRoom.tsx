import React, {FC, ReactNode, useRef } from 'react';
import {useFormik, FormikConfig} from 'formik';
import styled from 'styled-components';

const StyledSelf = styled.div`
  width: 500px;
  background-color: ${p => p.theme.colors.yello_white};
`; 

const StyledChatContainer= styled.div`
  height:100%;
`; 

const StyledEnterContainer= styled.div`
  display: flex;
`;

interface IEmbedChatProps {
  children: ReactNode
}
interface IChatValues{
  chat: string 
}
export const EmbedChatRoom:FC<IEmbedChatProps> = ({
  children
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (values: IChatValues) => {
    console.log(values.chat);
  }
  const formik = useFormik<IChatValues>({
    initialValues: {
      chat: '',
    },
    onSubmit: (values) => handleSubmit(values)
  })
  
  return(
    <StyledSelf>
      <StyledChatContainer>
        {children}
      </StyledChatContainer>
      <StyledEnterContainer>
        <form onSubmit={formik.handleSubmit}>
          <textarea 
            ref={textareaRef}
            onChange={formik.handleChange}
          />
          <button type="submit">입력</button>
        </form>
      </StyledEnterContainer>    
    </StyledSelf>
  )

}

export default EmbedChatRoom; 