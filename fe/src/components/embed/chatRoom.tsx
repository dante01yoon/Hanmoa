import React, { FC, ReactNode, useRef, useEffect, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import styled, { css } from "styled-components";
import { observer } from "mobx-react-lite";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useMobxStores, useSocket } from "@utils/store/useStores";
import link from "src/asset/link.svg";
import upload from "src/asset/upload.svg";
import { nanoid } from "nanoid";

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
  font-size: 18px;
  width: 100%;
  height: 10vh;
  padding: 16px;
  border: none;

  &:focus {
    outline: 0;
  }
`;

const StyledToolBox = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.gray_200};
  width: 100%;
  height: 48px;
`;

const StyledImageInput = styled.input`
  display: none;
`;

const iconButtonStyle = (props: any) => css`
  display: flex;
  background: ${props.clicked ? props.theme.colors.gray_300 : "none"};
  justify-content: center;
  align-items: center;
  width: 48px;

  &::after{
      content: "";
      line-height: 48px;
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url(${props.icon}) center/100%;
  }
`;

const StyledLinkButton = styled.div<{
  icon: string;
  clicked?: boolean;
}>`
  ${iconButtonStyle}
`;

const StyledUploadButton = styled.div<{
  icon: string;
  clicked?: boolean;
}>`
  ${iconButtonStyle}
`;

const StyledSubmitButtonWrapper = styled.div`
  background-color: ${(p) => p.theme.colors.whiteGray};
  width: 120px;
  height: 100%;
  padding: 20px;
  border: none;
`;

const StyledSubmitButton = styled.button<{ clicked: boolean }>`
  background: ${({ theme }) => theme.colors.gray_200};
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray_200};
`;

interface IEmbedChatProps {
  children: ReactNode;
}
interface IChatValues {
  chat: string;
}

interface IRefObject {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const INITIAL_TEXTAREA_VALUE = "Write your message..." as const;

const validationSchema = yup.object().shape({
  chat: yup.string()
    .max(200, "too long")
    .required("required"),
})

const EmbedChatRoom: FC<IEmbedChatProps> = ({ children }) => {
  // const [hasFocused, setHasFocused] = useState(false);
  const [isFocusing, setIsFocusing] = useState(false);
  const [clicked, setClicked] = useState(false);
  const scrollElementScrollBlockRef = useRef(true);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const { chatStore, sessionStore } = useMobxStores();
  const { id: roomId } = useParams<{ id: string }>();
  const { io } = useSocket();

  const handleSubmit = (values: IChatValues, { resetForm }: Pick<FormikHelpers<IChatValues>, "resetForm">) => {
    console.log(values.chat);
    io.emit("sendMessage", ({ roomId, message: values.chat }));
    resetForm({
      values: {
        chat: "",
      }
    });

    handleSetClick();
  };

  const formik = useFormik<IChatValues>({
    validationSchema,
    initialValues: {
      chat: "",
    },
    onSubmit: handleSubmit,
  });
  const formikRef = useRef(formik.values);

  const handleSetClick = (callback?: () => void) => {
    setClicked(true);
    if (callback) {
      callback();
    }
  };

  useEffect(() => {
    formik.validateForm();

    // socket 핸들러 관련 로직
    io.on("connect", () => {
      io.emit("roomJoin", ({ roomId, userId: sessionStore.curUserCode }))
    });
    io.on("sentMessage", ({ roomId, message }) => {
      console.log(roomId, message);
      const { name = "Kim", studentNumber = 21300492 } = sessionStore;
      chatStore.feedChatMessages({
        chatCardId: nanoid(),
        chatData: message,
        writtenAt: new Date().toISOString(),
        studentNumber,
        name,
      })
    })

    return () => {
      io.emit("leaveRoom", { roomId });
    }
  }, []);

  // formikRef 업데이트
  useEffect(() => {
    formikRef.current = formik.values;
  }, [formik.values]);

  const textareaFocusHandler = (e: FocusEvent): void => {
    setIsFocusing(true);
  };

  const textareaBlurHandler = (e: FocusEvent): void => {
    setIsFocusing(false);
  };

  const isTextValid = () => {
    return !!formik.errors.chat && !formik.isSubmitting;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!event.shiftKey && event.key === "Enter") {
      handleSubmit(formikRef.current, { resetForm: formik.resetForm });
      event.preventDefault();
    }
  };

  const handleScroll = (event: Event) => {
    if (scrollElementRef && scrollElementRef.current) {
      const isScrollBlock = scrollElementScrollBlockRef.current;
      const scrollElement = scrollElementRef.current;
      if (
        isScrollBlock
        &&
        !(scrollElement.scrollTop === scrollElement.scrollHeight - scrollElement.offsetHeight)
      ) {
        scrollElementScrollBlockRef.current = false;
      }
      else if (
        !isScrollBlock
        &&
        (scrollElement.scrollTop === scrollElement.scrollHeight - scrollElement.offsetHeight)
      ) {
        scrollElementScrollBlockRef.current = true;
      }
    }
  }

  // 스크롤 블럭 관련 로직
  useEffect(() => {
    if (scrollElementScrollBlockRef.current && scrollElementRef.current) {
      const scrollElement = scrollElementRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [chatStore.chatMessages.length]);

  const handleTextArea = () => {
    if (textAreaRef.current) {
      const refObject = {
        textAreaRef,
      };

      //ugly :(
      textAreaRef.current.addEventListener(
        "focusin",
        textareaFocusHandler.bind(refObject)
      );
      textAreaRef.current.addEventListener("blur", textareaBlurHandler);
      textAreaRef.current.focus();
    }
  };

  const uploadHandler = (e: React.MouseEvent<HTMLButtonElement>) => { };

  useEffect(() => {
    handleTextArea();

    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.addEventListener("keydown", handleKeyDown.bind(formik));
    }

    if (scrollElementRef && scrollElementRef.current) {
      scrollElementRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      textAreaRef.current?.removeEventListener("keydown", handleKeyDown);
      textAreaRef.current?.removeEventListener("focusin", textareaFocusHandler);
      textAreaRef.current?.removeEventListener("blur", textareaBlurHandler);
    };
  }, []);

  return (
    <>
      <StyledSelf ref={scrollElementRef}>
        <StyledChatContainer>{children}</StyledChatContainer>
      </StyledSelf>
      <StyledToolBox>
        <StyledUploadButton
          clicked
          icon={upload}
        />
        <StyledLinkButton
          icon={link}
        />
      </StyledToolBox>
      <StyledEnterContainer>
        <form onSubmit={formik.handleSubmit}>
          <StyledTextArea
            name="chat"
            ref={textAreaRef}
            onChange={formik.handleChange}
            placeholder={
              isTextValid() && !isFocusing ? INITIAL_TEXTAREA_VALUE : ""
            }
            value={formik.values.chat}
          />
          <StyledSubmitButtonWrapper>
            <StyledSubmitButton
              clicked={clicked}
              type="submit"
              disabled={isTextValid()}
            >
              입력
            </StyledSubmitButton>
          </StyledSubmitButtonWrapper>
        </form>
      </StyledEnterContainer>
    </>
  );
};

export default observer(EmbedChatRoom);
