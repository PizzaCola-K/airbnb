import { useReducer, createContext, useMemo, useContext,useState } from "react";
import { popUpState, Action, popUpDispatch } from './GlobalInterface';

const initPopUpState = {
    calendarPopUp: false,
    pricePopUp: false,
    personnelPopUp: false,
    currentValue: '',
    currentClass: '',
};

const popUpReducer = (state:popUpState, action: Action):popUpState => {
    switch (action.type) {
      case 'calendarON':
        return {
          calendarPopUp: true,
          pricePopUp: false,
          personnelPopUp: false,
          currentValue: action.type,
        };
      case 'priceON':
        return {
          calendarPopUp: false,
          pricePopUp: true,
          personnelPopUp: false,
          currentValue: action.type,
        };
      case 'personnelON':
        return {
          calendarPopUp: false,
          pricePopUp: false,
          personnelPopUp: true,
          currentValue: action.type,
        };
      case `repeat`:
        return {
          calendarPopUp: false,
          pricePopUp: false,
          personnelPopUp: false,
          currentValue: '',
        };
      default:
        throw new Error('Not State');
    }
};

const popUpStateContext = createContext<popUpState | null>(null);
const popUpDispatchContext = createContext<popUpDispatch | null>(null);

export const PopUpProvider = ({ children }:{ children: React.ReactNode }) => {
    const [popUpState, popUpDispatch] = useReducer(popUpReducer, initPopUpState);
    const popUpValue = useMemo(() => (popUpState), [popUpState]);
    const popUpDispatchValue = useMemo(() => (popUpDispatch), [popUpDispatch]);
    
    return ( 
        <popUpStateContext.Provider value={popUpValue}>
          <popUpDispatchContext.Provider value={popUpDispatchValue}>
              {children}
          </popUpDispatchContext.Provider>
        </popUpStateContext.Provider>
    );
  }

  export const usePopUpState = ():popUpState => {
    const popUpState = useContext(popUpStateContext);
    if(!popUpState) throw new Error('Cannot find SampleProvider');
    return popUpState;
  }
  export const usePopUpDispatch = ():popUpDispatch => {
    const dispatch = useContext(popUpDispatchContext);
    if (!dispatch) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
    return dispatch;
  }


