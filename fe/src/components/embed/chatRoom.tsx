import React, { FC, ReactNode, useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import * as yup from "yup";

import enter from "src/asset/enter.svg";
import upload from "src/asset/upload.svg";
const StyledSelf = styled.div`
  background-color: ${(p) => p.theme.colors.dark_sky_blue};
  height: 75vh;
`;

const StyledChatContainer = styled.div`
  padding: 48px;
  height: 100%;
  max-width: 500px;
  ${(p) => p.theme.media.lb`
      width: 480px;
  `}

  position: relative;
`;

const StyledEnterContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 0 0 8px 8px;

  & > form {
    width: 100%;
    display: flex;
  }
  ${(p) => p.theme.media.lb`
      width: 480px;
  `}
`;

const StyledTextArea = styled.textarea`
  background-color: ${(p) => p.theme.colors.whiteGray};
  display: block;
  resize: none;
  width: 100%;
  height: 10vh;
  padding: 16px;
  border: none;

  &:focus {
    outline: 0;
  }
`;

const StyledToolBox = styled.div`
  background: ${({theme}) => theme.colors.gray_200};
  width: 100%;
  height: 48px;
`;

const StyledImageInput = styled.input`
  display: none;
`;

const StyledUploadButton = styled.button`
 &::after{
    content: "";
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url(${upload}) center/100%;
  }
`;

const StyledSubmitButtonWrapper = styled.div`
  background-color: ${(p) => p.theme.colors.whiteGray};
  width: 120px;
  height: 100%;
  padding: 20px;
  border: none;
`;

const StyledSubmitButton = styled.button<{ clicked: boolean }>`
  background: ${({theme}) => theme.colors.gray_200};
  width: 100%;
  height: 100%;
  border: 1px solid ${({theme}) => theme.colors.gray_200};
`;

interface IEmbedChatProps {
  children: ReactNode;
}
interface IChatValues {
  chat: string;
}

interface IRefObject {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const INITIAL_TEXTAREA_VALUE = "Write your message..." as const;

const EmbedChatRoom: FC<IEmbedChatProps> = ({ children }) => {
  // const [hasFocused, setHasFocused] = useState(false);
  const [isFocusing, setIsFocusing] = useState(false);
  const [clicked, setClicked] = useState(false);
  const inputImageRef = useRef<HTMLInputElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSetClick = () => {
    setClicked(true);
  };

  const handleSubmit = (values: IChatValues) => {
    console.log(values.chat);
    handleSetClick();
  };

  const validationSchema = yup.object().shape({
    chat: yup.string()
      .max(200, "too long")
      .required("required"),
  })

  const formik = useFormik<IChatValues>({
    validationSchema,
    initialValues: {
      chat: "",
    },
    onSubmit: (values) => handleSubmit(values),
  });

  const textareaFocusHandler = (e: FocusEvent): void => {
    setIsFocusing(true);
  };

  const textareaBlurHandler = (e: FocusEvent): void => {
    setIsFocusing(false);
  };

  const isTextValid = () => {
    return !!formik.errors.chat;
  };

  const handleTextArea = () => {
    if (textareaRef.current) {
      const refObject = {
        textareaRef,
      };

      //ugly :(
      textareaRef.current.addEventListener(
        "focusin",
        textareaFocusHandler.bind(refObject)
      );
      textareaRef.current.addEventListener("blur", textareaBlurHandler);
      textareaRef.current.focus();
    }
  };
  const uploadHandler = (e: React.MouseEvent<HTMLButtonElement>) => {};
  useEffect(() => {
    handleTextArea();

    return () => {
      textareaRef.current?.removeEventListener("focusin", textareaFocusHandler);
      textareaRef.current?.removeEventListener("blur", textareaBlurHandler);
    };
  }, []);
  return (
    <>
      <StyledSelf>
        <StyledChatContainer>{children}</StyledChatContainer>
      </StyledSelf>
      <StyledToolBox>
            
      </StyledToolBox>
      <StyledEnterContainer>
        <form onSubmit={formik.handleSubmit}>
          <StyledTextArea
            name="chat"
            ref={textareaRef}
            onChange={formik.handleChange}
            placeholder={
              isTextValid() && !isFocusing ? INITIAL_TEXTAREA_VALUE : ""
            }
          />
          <StyledSubmitButtonWrapper>
            <StyledSubmitButton
              clicked={clicked}
              type="submit"
              disabled={!isTextValid()}
            >
              입력
            </StyledSubmitButton>
          </StyledSubmitButtonWrapper>
        </form>
      </StyledEnterContainer>
    </>
  );
};

export default EmbedChatRoom;
