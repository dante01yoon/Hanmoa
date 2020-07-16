import React, {FC, ReactNode, useRef, useEffect } from 'react';
import {useFormik, } from 'formik';
import styled from 'styled-components';

const StyledSelf = styled.div`
  background-color: ${p => p.theme.colors.yello_white};
  height:75vh;
  
`; 

const StyledChatContainer= styled.div`
  padding: 48px 64px; 
  height:100%;
  max-width:500px;
  ${p => p.theme.media.lb`
      width: 480px;
  `}
  
  position: relative;
`; 

const StyledEnterContainer= styled.div`
  display: flex;
  & > form {
    width: 100%;
    display:flex;
  }
  max-width:500px;
  ${p => p.theme.media.lb`
      width: 480px;
  `}
`;

const StyledTextArea = styled.textarea`
  padding: 16px;
  display:inline-block;
  resize: none;
  border-radius: 8px;
  width: 100%;
  height: 10vh; 
  background-color: ${p => p.theme.colors.whiteGray}; 
` 

interface IEmbedChatProps {
  children: ReactNode
}
interface IChatValues{
  chat: string 
}
const EmbedChatRoom:FC<IEmbedChatProps> = ({
  children
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (values: IChatValues) => {
    console.log(values.chat);
  }
  const formik = useFormik<IChatValues>({
    initialValues: {
      chat: 'Write your message...',
    },
    onSubmit: (values) => handleSubmit(values)
  })
  
  useEffect(() => {
    if(textareaRef.current){
      textareaRef.current.focus();
    }
  },[]);
  return(
    <>
      <StyledSelf>
        <StyledChatContainer>
          {children}
        </StyledChatContainer>
      </StyledSelf>
      <StyledEnterContainer>
        <form onSubmit={formik.handleSubmit}>
          <StyledTextArea 
            name="chat"
            ref={textareaRef}
            onChange={formik.handleChange}
            placeholder={"Write your message..."}
          />
          <button type="submit">입력</button>
        </form>
      </StyledEnterContainer> 
    </>   
  )

}

export default EmbedChatRoom; 