
import React, { createContext } from "react";
import styled from "styled-components";
import { observable } from "mobx";
import { useLocalStore, } from "mobx-react-lite";

const StyledBlackContainer

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

const createToastManager = () => {
  const toasts: Array<React.ReactElement> = [];

  return useLocalStore(() => ({
    toasts,
    closeToast: () => {
      toasts.pop();
    },
    openToast: (toast: React.ReactElement) => {
      toasts.push(toast);
    }
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
  return (
    <ToastContext.Provider value={value}>
      <StyledToastWrapper>
        <StyledToastTopContainer>

        </StyledToastTopContainer>
        <StyledToastRightContainer>

        </StyledToastRightContainer>
        <StyledToastBottomContainer>

        </StyledToastBottomContainer>
        <StyledToastLeftContainer>

        </StyledToastLeftContainer>
        {
          React.Children.toArray(
            value.toasts.map((element) =>
              React.cloneElement(element)
            )
          )
        }
      </StyledToastWrapper>
    </ToastContext.Provider>
  )
}

export default ToastManager;