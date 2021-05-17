import {
  StateContext,
  DispatchContext,
  Action as ModalAction
} from 'src/store/modal';
import { useContext } from 'react';

function useModalState() {
  const context = useContext(StateContext);
  if (!context)
    throw new Error(`StateContext Provider doesn't exist`);
  return context;
}

function useModalDispatch() {
  const context = useContext(DispatchContext);
  if (!context)
    throw new Error(`DispatchContext Provider doesn't exist`);
  return context;
}

function useModal(): [
  ReturnType<typeof useModalState>, ReturnType<typeof useModalDispatch>
] {
  return [useModalState(), useModalDispatch()];
}

export {
  useModalState,
  useModalDispatch,
  useModal
};