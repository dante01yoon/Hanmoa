import React, { FC, createContext } from 'react';
import { ModalProps } from 'src/models/modal';
import { CardData } from 'src/models/card';

export const ModalContext = createContext<ModalProps | null> (null);

export const ModalProvider:FC = ({
  children
}) => {
  return(
    <ModalContext.Provider 
      value={ 
        Object.assign({} as CardData, { visible: false})
      }
    >
      {children}
    </ModalContext.Provider>
  )
}