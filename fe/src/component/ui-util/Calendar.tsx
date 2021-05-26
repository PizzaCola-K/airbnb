import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useReducer, useState } from 'react';
import { Month } from './Month';

interface DateInterface {
  start_date: string | Date | null;
  end_date: string | Date | null;
}

interface Action {
  type: string;
  value: string | Date;
}

const dateReducer = (state: DateInterface, action: Action): DateInterface => {
  // 선택한 날짜를 받음
  // 근데 action 타입이???

  // 1. SET_START 시작일이 없는 경우 ==> 시작일 할당
  // 2. SET_END 종료일이 없는 경우 ==> 종료일 할당
  // 3. SET_START 시작일이 있으면서 종료일이 없고 시작일 이전 일을 선택하는 경우 ==> 시작일 갱신
  // 4. SET_START_REMOVE_PREV 시작일이 있으면서 종료일이 있고 시작일 이전 일을 선택하는 경우 ==> 시작일 갱신, 종료일 지우기
  // 5. SET_REMOVE 종료일이 있으면서 종료일 이후 일을 선택하는 경우 ==> 종료일 갱신
  // 6. SET_END 종료일이 있으면서 시작일과 종료일 사이를 선택하는 경우 ==> 종료일 갱신
  // 공통: 시작일과 종료일 사이를 선택처리?
  switch (action.type) {
    case 'SET_START':
      return { ...state, start_date: action.value };
    case 'SET_END':
      return { ...state, end_date: action.value };
    case 'SET_START_REMOVE_PREV':
      return { ...state, start_date: action.value, end_date: null };
    default:
      return state;
  }
};

export const Calendar = () => {
  const [selectedDate, dateDispatch] = useReducer(dateReducer, {
    start_date: null,
    end_date: null,
  });
  // const [startMonth, setStartMonth] = useState(selectedDate.start_date && new Date(selectedDate.start_date) || new Date());

  const [startMonth, setStartMonth] = useState(new Date());
  const months = Array(4)
    .fill('')
    .map((_, i) => {
      const tmpDate = new Date(startMonth);
      const date = new Date(tmpDate.setMonth(tmpDate.getMonth() + i - 1));
      return <Month key={tmpDate.getFullYear() + i} date={date} />;
    });

  const onMoveMonth = (cnt: number) => {
    const tmpDate = new Date(startMonth);
    tmpDate.setMonth(tmpDate.getMonth() + cnt);
    setStartMonth(tmpDate);
  };

  return (
    <StyleCalendar>
      <StyleMonths>{months}</StyleMonths>
      <StyleButtons>
        <button onClick={() => onMoveMonth(-1)}>
          <FaAngleLeft />
        </button>
        <button onClick={() => onMoveMonth(1)}>
          <FaAngleRight />
        </button>
      </StyleButtons>
    </StyleCalendar>
  );
};

const StyleCalendar = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const StyleMonths = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 50%);
  overflow: hidden;
`;

const StyleButtons = styled.div`
  position: absolute;
  top: -0.4rem;
  width: 100%;
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  button {
    border: 0;
    background-color: transparent;
    outline: none;
    padding: 0.5rem;
    font-size: 1.5rem;
    line-height: 1rem;
    cursor: pointer;
    color: #555;
  }
  button:hover {
    color: #333;
  }
`;
