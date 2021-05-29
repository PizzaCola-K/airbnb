import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useReducer, useState, useEffect, useContext } from 'react';
import { CalendarDateContext } from './CalendarContext';
import { Month } from './Month';

export const Calendar = () => {
  // alert(useContext(CalendarDateContext));
  const [selectedDate, dateDispatch] = useContext(CalendarDateContext);
  const [startMonth, setStartMonth] = useState(new Date());
  const [count, setCount] = useState(0);

  // if(selectedDate) {
  //   return;
  // }
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const months = Array(4)
    .fill('')
    .map((_, i) => {
      const tmpDate = new Date(startMonth);
      const date = new Date(tmpDate.setMonth(tmpDate.getMonth() + i - 1));
      return (
        <Month
          key={tmpDate.getFullYear() + i}
          date={date}
          now={now}
          startDate={selectedDate?.startDate}
          endDate={selectedDate?.endDate}
          dateDispatch={dateDispatch}
        />
      );
    });

  // const onMoveMonth = (cnt: number) => {
  //   const tmpDate = new Date(startMonth);

  //   tmpDate.setMonth(tmpDate.getMonth() + cnt);
  //   setStartMonth(tmpDate);
  // };

  const onTransitionEnd = () => {
    const tmpDate = new Date(startMonth);

    tmpDate.setMonth(tmpDate.getMonth() + count);
    setCount(0);
    setStartMonth(tmpDate);
  };

  // useEffect(() => {
  //   console.log(selectedDate);
  // }, [selectedDate]);

  return (
    <StyleCalendar>
      <StyleMonths onTransitionEnd={onTransitionEnd} count={count}>
        {months}
      </StyleMonths>
      <StyleButtons>
        <button onClick={() => setCount(-1)}>
          <FaAngleLeft />
        </button>
        <button onClick={() => setCount(1)}>
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
  overflow: hidden;
`;

const StyleMonths = styled.div<{ count: number }>`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 50%);
  transition: ${(props) =>
    props.count !== 0 ? 'transform 0.3s ease-in-out' : ''};
  transform: ${(props) =>
    props.count === 1
      ? 'translateX(-100%)'
      : props.count === -1
      ? 'translateX(0%)'
      : 'translateX(-50%)'};
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
