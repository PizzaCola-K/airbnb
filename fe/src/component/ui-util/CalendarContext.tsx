import { createContext, useReducer } from 'react';

interface DateInterface {
  startDate: Date | null;
  endDate: Date | null;
  [key: string]: Date | null;
}

export interface DateAction {
  type: string;
  value: Date;
  [key: string]: string | Date;
}

export const CalendarDateContext = createContext<
  [DateInterface, React.Dispatch<DateAction>] | [null, null]
>([null, null]);

const dateReducer = (
  state: DateInterface,
  action: DateAction
): DateInterface => {
  // 선택한 날짜를 받음
  // 근데 action 타입이???
  switch (action.type) {
    case 'SET_START':
      return { ...state, startDate: action.value };
    case 'SET_END':
      return { ...state, endDate: action.value };
    case 'SET_START_REMOVE_PREV':
      return { ...state, startDate: action.value, endDate: null };
    case 'RESET':
      return { ...state, startDate: null, endDate: null };
    default:
      return state;
  }
};

export const CalendarContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [date, dateDispatch] = useReducer(dateReducer, {
    startDate: null,
    endDate: null,
  });
  return (
    <CalendarDateContext.Provider value={[date, dateDispatch]}>
      {children}
    </CalendarDateContext.Provider>
  );
};
