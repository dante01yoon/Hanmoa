
import React from "react";
import styled from "styled-components";
import { useLocalObservable, observer } from "mobx-react-lite";
import { nanoid } from "nanoid";

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
  display: flex;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;

const StyledToastRightContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const StyledToastBottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: all ease-in 0.3s;
`;

const StyledToastTopContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledSingleToastWrapper = styled.div<{
  position: string;
  nth: number;
}>`
  ${({ position }) => `margin-${position}: 40px;`}
  transition: all ease 0.3s;
`;

type ToastPosition = "top" | "right" | "bottom" | "left";

interface OpenToastOptions {
  position: ToastPosition;
  hasBlackBackgroud?: boolean;
  time?: number;
}

interface ToastElement {
  toastElement: React.ReactElement;
  position: ToastPosition;
  uuid?: string;
}

const createToastManager = () => {
  const toasts: Array<ToastElement> = [];

  const toastStore = useLocalObservable(() => ({
    toasts,
    openToast(toast: ToastElement["toastElement"], options: OpenToastOptions) {
      const uuid = nanoid(10);
      this.toasts.push({
        toastElement: toast,
        position: options.position,
        uuid,
      });
      setTimeout(() => {
        this.closeToast(uuid);
      }, options.time || 3000);

      return uuid;
    },
    closeToast(uuid?: string, position?: ToastPosition) {
      const uuidIndex = this.toasts.findIndex((toast: ToastElement) => toast.uuid === uuid);

      if (uuidIndex >= 0) {
        this.toasts.splice(uuidIndex, 1);
      }
    }
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