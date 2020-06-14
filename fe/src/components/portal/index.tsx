import React, { FC } from 'react';
import ReactDOM from 'react-dom';

export const Portal: FC = ({children}) => {
  const el = document.querySelector('#mordal');
  return ReactDOM.createPortal(children, el!);
}

