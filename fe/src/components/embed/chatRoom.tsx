import React, { FC, ReactNode, useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import styled from "styled-components";

import Send from "src/asset/send.png";
import SendBefore from "src/asset/send-before.png";
const StyledSelf = styled.div`
  background-color: ${(p) => p.theme.colors.yello_white};
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
  & > form {
    width: 100%;
    display: flex;
  }
  max-width: 500px;
  ${(p) => p.theme.media.lb`
      width: 480px;
  `}
`;

const StyledTextArea = styled.textarea`
  padding: 16px;
  display: inline-block;
  resize: none;
  border-radius: 8px;
  width: 100%;
  height: 10vh;
  background-color: ${(p) => p.theme.colors.whiteGray};
`;
const StyledSubmitButton = styled.button<{ clicked: boolean }>`
  &::after {
    content: "";
    display:block;
    width: 48px;
    height: 48px;
    background-image: url('${(p) => (p.clicked ? SendBefore : Send)}');
    background-position: center;
    background-size: cover;
    transition: all 0.6s ease; 
  }
`;
interface IEmbedChatProps {
  children: ReactNode;
}
interface IChatValues {
  chat: string;
}
interface IRefObject {
  textareaRef:  React.RefObject<HTMLTextAreaElement>
}
const INITIAL_TEXTAREA_VALUE = "Write your message..." as const;
const EmbedChatRoom: FC<IEmbedChatProps> = ({ children }) => {
  // const [hasFocused, setHasFocused] = useState(false);
  const [isFocusing, setIsFocusing] = useState( false);
  const [clicked, setClicked] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSetClick = () => {
    setClicked(true);
  };
  const handleSubmit = (values: IChatValues) => {
    console.log(values.chat);
    handleSetClick();
  };

  const formik = useFormik<IChatValues>({
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
  }
  const isTextEmpty = () => {
    return formik.values.chat.length === 0
  }
  const handleTextArea = () => {
    if (textareaRef.current) {
      const refObject = {
        textareaRef
      }

      //ugly :(
      textareaRef.current.addEventListener("focusin", textareaFocusHandler.bind(refObject));
      textareaRef.current.addEventListener("blur",textareaBlurHandler );
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    handleTextArea();

    return () => {
      textareaRef.current?.removeEventListener("focusin", textareaFocusHandler);
      textareaRef.current?.removeEventListener("blur",textareaBlurHandler );

    };
  }, []);
  return (
    <>
      <StyledSelf>
        <StyledChatContainer>{children}</StyledChatContainer>
      </StyledSelf>
      <StyledEnterContainer>
        <form onSubmit={formik.handleSubmit}>
          <StyledTextArea
            name="chat"
            ref={textareaRef}
            onChange={formik.handleChange}
            placeholder ={ isTextEmpty() && !isFocusing ? INITIAL_TEXTAREA_VALUE : ''  }
          />
          <StyledSubmitButton
            clicked={clicked}
            type="submit"
            disabled={clicked}
          />
        </form>
      </StyledEnterContainer>
    </>
  );
};

export default EmbedChatRoom;
