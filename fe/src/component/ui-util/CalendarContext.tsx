import { createContext, useReducer } from 'react';
import qs from 'qs';

interface DateInterface {
  startDate: Date | null;
  endDate: Date | null;
  tmpEndDate: Date | null;
  [key: string]: Date | null;
}

export interface DateAction {
  type: string;
  value: Date;
  [key: string]: string | Date | undefined;
}

export const CalendarDateContext = createContext<
  [DateInterface, React.Dispatch<DateAction>] | [null, null, null]
>([null, null, null]);

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
      return { ...state, endDate: action.value, tmpEndDate: null };
    case 'SET_START_REMOVE_PREV':
      return {
        ...state,
        startDate: action.value,
        endDate: null,
        tmpEndDate: null,
      };
    case 'SET_TMP_END_DATE':
      return {
        ...state,
        tmpEndDate: action.value,
      };
    case 'RESET':
      return { ...state, startDate: null, endDate: null, tmpEndDate: null };
    default:
      return state;
  }
};

export const CalendarContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  let checkIn: Date | null = null;
  let checkOut: Date | null = null;
  if (query?.checkIn) checkIn = new Date(query?.checkIn as string) || null;
  if (query?.checkOut) checkOut = new Date(query?.checkOut as string) || null;
  const [date, dateDispatch] = useReducer(dateReducer, {
    startDate: checkIn,
    endDate: checkOut,
    tmpEndDate: null,
  });
  return (
    <CalendarDateContext.Provider value={[date, dateDispatch]}>
      {children}
    </CalendarDateContext.Provider>
  );
};
