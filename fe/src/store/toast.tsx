
import React from "react";
import styled, { css } from "styled-components";
import { useLocalStore, } from "mobx-react-lite";

const StyledBlackContainer = styled.div`
  position: fixed;
  z-index: 1050;
  width: 100%;
  height: 100%;
`;

const StyledToastWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`;

const StyledToastLeftContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;

const StyledToastRightContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const StyledToastBottomContainer = styled.div`
  position: absolute;
  right: 50%;
  bottom: 0;
  transform: translateX(-50%);
`;

const StyledToastTopContainer = styled.div`
  position: absolute;
  top: 0;
  right: 50%;
  transform: translateX(-50%);
`;

const StyledSingleToastWrapper = styled.div<{
  nth: number;
  position: string;
}>`
  position: absolute;
  transition: all ease 0.3s;
  ${({ position, nth }) => css`${position}: ${(nth * 50)}px`}; 
`;

type ToastPosition = "top" | "right" | "bottom" | "left";

interface OpenToastOptions {
  position: ToastPosition;
  hasBlackBackgroud?: boolean;
}

interface ToastElement {
  toastElement: React.ReactElement;
  position: ToastPosition;
}

const createToastManager = () => {
  const toasts: Array<ToastElement> = [];

  const openToast = (toast: ToastElement, options: OpenToastOptions) => {
    toasts.push(toast);
  }

  return useLocalStore(() => ({
    toasts,
    openToast,
  }))
}

type ToastStore = ReturnType<typeof createToastManager>;

interface ToastManagerProps {
  value: ToastStore;
}

const ToastContext = React.createContext<ToastStore | null>(null);

const ToastManager: React.FC<ToastManagerProps> = ({
  value,
}) => {

  const handleToastTransition = (toast, index) => {
    return (
      <StyledSingleToastWrapper>

      </StyledSingleToastWrapper>
    )
  }

  const renderToasts = (toasts: ToastElement[], position: ToastPosition) => {
    return React.Children.toArray(
      toasts.filter((toast) => toast.position === position)
        .map((filteredToast) => React.cloneElement(filteredToast.toastElement))
    )
  }


  return (
    <ToastContext.Provider value={value}>
      <StyledToastWrapper>
        <StyledToastTopContainer>
          {renderToasts(value.toasts, "top")}
        </StyledToastTopContainer>
        <StyledToastRightContainer>
          {renderToasts(value.toasts, "right")}
        </StyledToastRightContainer>
        <StyledToastBottomContainer>
          {renderToasts(value.toasts, "bottom")}
        </StyledToastBottomContainer>
        <StyledToastLeftContainer>
          {renderToasts(value.toasts, "left")}
        </StyledToastLeftContainer>
      </StyledToastWrapper>
    </ToastContext.Provider>
  )
}

export default ToastManager;