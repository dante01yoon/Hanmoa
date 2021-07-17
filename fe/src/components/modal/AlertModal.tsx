import React, { FC } from "react";
import isNil from "lodash/isNil";
import noop from "lodash/noop";
import * as Styled from "./style";
import styled from 'styled-components';
import { BaseButton } from "../button";
import { useModalDispatch } from "@utils/modal/useModal";

interface AlertModalProps {
  title?: string;
  message?: string;
  confirmText?: string;
  onConfirm?: () => void;
}

const {
  Wrapper,
  StyledContainer,
  Row,
  Name,
  Description,
  Member,
  StudentNumber,
  StudentName,
  MemberList,
  ButtonWrapper,
  StyledInput,
  ErrorRow,
  ErrorField,
} = Styled;

const StyledRow = styled(Row)`
  text-align: center;
`;

const StyledDescription = styled(Description)`
  width: 100%;
`;

const AlertModal: FC<AlertModalProps> = ({
  title,
  message,
  confirmText = "확인",
  onConfirm,
}) => {
  const close = useModalDispatch();

  const handleConfirm = () => {
    if (isNil(onConfirm)) {
      close({ type: "CLOSE" });
    }
    else {
      onConfirm();
    }
  }

  return (
    <Wrapper>
      <StyledContainer>
        <StyledRow>
          <Name>{title}</Name>
          <StyledDescription>{message}</StyledDescription>
        </StyledRow>
        <StyledRow>
          <ButtonWrapper>
            <BaseButton
              background={"#28D84F"}
              clickHandler={handleConfirm}
            >
              {confirmText}
            </BaseButton>
            <BaseButton
              background={"#DC3943"}
              clickHandler={() => close({ type: "CLOSE" })}
            >
              닫기
            </BaseButton>
          </ButtonWrapper>
        </StyledRow>
      </StyledContainer>
    </Wrapper >
  )
}

export default AlertModal;