import { useReducer, createContext, useMemo, useContext } from 'react';
import {
  personnelAction,
  personnelState,
  personnelDispatch,
} from './GlobalInterface';

const initPersonnelState: Array<personnelState> = [
  { title: '성인', count: 0, desc: '만 13세 이상' },
  { title: '어린이', count: 0, desc: '만 2세 이상' },
  { title: '유아', count: 0, desc: '만 2세 미만' },
];

const personnelReducer = (
  state: typeof initPersonnelState,
  action: personnelAction
): typeof initPersonnelState => {
  const newState: typeof initPersonnelState = state.map((v) => {
    return { ...v };
  });
  if (action.index > -1) newState[action.index].count += action.counter;
  else newState.forEach((v, i) => (newState[i].count = 0));
  return newState;
};
const personnelStateContext = createContext<personnelState[] | null>(null);
const personnelDispatchContext = createContext<personnelDispatch | null>(null);

export const PersonnelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [personState, personDispatch] = useReducer(
    personnelReducer,
    initPersonnelState
  );
  const personValue = useMemo(() => personState, [personState]);
  const personDispatchValue = useMemo(() => personDispatch, [personDispatch]);

  return (
    <personnelStateContext.Provider value={personValue}>
      <personnelDispatchContext.Provider value={personDispatchValue}>
        {children}
      </personnelDispatchContext.Provider>
    </personnelStateContext.Provider>
  );
};

export const usePersonnelState = (): personnelState[] => {
  const personnelState = useContext(personnelStateContext);
  if (!personnelState) throw new Error('Cannot find SampleProvider');
  return personnelState;
};
export const usePersonnelDispatch = (): personnelDispatch => {
  const dispatch = useContext(personnelDispatchContext);
  if (!dispatch) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
};
