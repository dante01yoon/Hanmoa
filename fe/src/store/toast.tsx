
import React from "react";
import styled, { css } from "styled-components";
import { useLocalObservable, observer } from "mobx-react-lite";

const StyledBlackContainer = styled.div`
  position: fixed;
  z-index: 1050;
  width: 100%;
  height: 100%;
`;

const StyledToastWrapper = styled.div`
  position: fixed;
  top: 0;
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

  const toastStore = useLocalObservable(() => ({
    toasts,
    openToast(toast: ToastElement["toastElement"], options: OpenToastOptions) {
      this.toasts.push({
        toastElement: toast,
        position: options.position,
      });
    },
  }));

  return toastStore;
}

type ToastStore = ReturnType<typeof createToastManager>;

const ToastContext = React.createContext<ToastStore | null>(null);

export const useToast = () => {
  const toastContext = React.useContext(ToastContext);

  if (!toastContext) {
    throw Error("ToastProvider not provided");
  }
  return toastContext;
}

const ToastManager: React.FC = ({
  children,
}) => {
  const toastValue = createToastManager();

  const handleToastTransition = (toastObject: ToastElement, index: number) => {
    return (
      <StyledSingleToastWrapper nth={index} position={toastObject.position}>
        {toastObject.toastElement}
      </StyledSingleToastWrapper>
    )
  }

  const renderToasts = (toasts: ToastElement[], position: ToastPosition) => {
    return React.Children.toArray(
      toasts.filter((toast) => toast.position === position)
        .map((filteredToast, nth) => handleToastTransition({
          toastElement: React.cloneElement(filteredToast.toastElement),
          position,
        }, nth))
    )
  }
  return (
    <ToastContext.Provider value={toastValue}>
      <>
        {children}
      </>
      <StyledToastWrapper>
        <StyledToastTopContainer>
          {renderToasts(toastValue.toasts, "top")}
        </StyledToastTopContainer>
        <StyledToastRightContainer>
          {renderToasts(toastValue.toasts, "right")}
        </StyledToastRightContainer>
        <StyledToastBottomContainer>
          {renderToasts(toastValue.toasts, "bottom")}
        </StyledToastBottomContainer>
        <StyledToastLeftContainer>
          {renderToasts(toastValue.toasts, "left")}
        </StyledToastLeftContainer>
      </StyledToastWrapper>
    </ToastContext.Provider>
  )
}

export default observer(ToastManager);