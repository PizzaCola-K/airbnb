import styled, { css } from 'styled-components';
import React, { Dispatch } from 'react';
import { DateAction } from './CalendarContext';

interface MonthProp {
  date: Date;
  now: Date;
  startDate: string | Date | null | undefined;
  endDate: string | Date | null | undefined;
  tmpEndDate: string | Date | null | undefined;
  dateDispatch: Dispatch<DateAction> | null;
  popUpModal: any;
}

interface StyleDayProp {
  period: number;
  start: number;
  end: number;
  previous: number;
  popUpModal: any;
}

const initDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weeks = ['일', '월', '화', '수', '목', '금', '토'];

const getLastDay = (date: Date) => {
  let lastDay = initDate[date.getMonth()];
  if (date.getMonth() === 1) {
    const year = date.getFullYear();
    lastDay += !(year % 400) || (year % 100 && !(year % 4)) ? 1 : 0;
  }
  return lastDay;
};

export const Month = ({
  date,
  now,
  startDate,
  endDate,
  tmpEndDate,
  dateDispatch,
  popUpModal,
}: MonthProp) => {
  date.setDate(1);
  const startWeek = date.getDay();
  const lastDate = getLastDay(date);
  const days = new Array(startWeek).fill('').concat(
    Array(lastDate)
      .fill(0)
      .map((_, i) => i + 1)
  );
  const monthText =
    date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;

  const handleMouseOver = (e: React.MouseEvent) => {
    const tmpDate = date;
    const target = e.target as HTMLElement;
    if (!startDate || endDate || !dateDispatch) return;
    if (
      !target?.textContent ||
      target?.textContent === '' ||
      Number(target.textContent) > 31
    ) {
      return;
    }
    tmpDate.setDate(Number(target?.textContent));
    tmpDate.setHours(0, 0, 0, 0);
    dateDispatch({ type: 'SET_TMP_END_DATE', value: tmpDate });
  };
  const handleClick = (e: React.MouseEvent) => {
    const tmpDate = date;
    const target = e.target as HTMLElement;
    if (
      !target?.textContent ||
      target?.textContent === '' ||
      !dateDispatch ||
      Number(target.textContent) > 31
    ) {
      return;
    }
    tmpDate.setDate(Number(target?.textContent));
    tmpDate.setHours(0, 0, 0, 0);
    if (!startDate || startDate > tmpDate) {
      const type = endDate ? 'SET_START_REMOVE_PREV' : 'SET_START';
      dateDispatch({ type, value: tmpDate });
    } else {
      dateDispatch({ type: 'SET_END', value: tmpDate });
    }
  };
  return (
    <StyleMonth>
      <StyleTitle>{`${date.getFullYear()}년 ${monthText}월`}</StyleTitle>
      <StyleWeeks>
        {weeks.map((v, i) => (
          <StyleWeek key={'week' + i}>{v}</StyleWeek>
        ))}
      </StyleWeeks>
      <StyleDays
        onClick={(e) => handleClick(e)}
        onMouseOver={(e) => handleMouseOver(e)}
      >
        {days.map((v, i) => {
          let previous = 0;
          let period = 0;
          let start = 0;
          let end = 0;
          if (v) {
            let tmpDate = new Date(date);
            tmpDate.setDate(v);
            if (tmpDate < now) previous = 1;
            tmpDate.setHours(0, 0, 0, 0);
            if (
              startDate &&
              new Date(tmpDate).getTime() === new Date(startDate).getTime()
            )
              start = 1;
            if (
              (endDate &&
                new Date(tmpDate).getTime() === new Date(endDate).getTime()) ||
              (tmpEndDate &&
                new Date(tmpDate).getTime() === new Date(tmpEndDate).getTime())
            )
              end = 1;
            if (startDate && tmpDate >= startDate) {
              if (
                (endDate && tmpDate <= endDate) ||
                (tmpEndDate && tmpDate <= tmpEndDate)
              ) {
                period = 1;
              }
            }
          } else {
            previous = v === '' ? 1 : previous;
          }
          return (
            <StyleDay
              period={period}
              start={start}
              end={end}
              previous={previous}
              key={date.getDate() + i}
              popUpModal={popUpModal}
            >
              {v}
            </StyleDay>
          );
        })}
      </StyleDays>
    </StyleMonth>
  );
};

const StyleMonth = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

const StyleTitle = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const StyleWeeks = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

const StyleWeek = styled.div``;

const StyleDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

const StyleDay = styled.div`
  padding: ${({ popUpModal }) => (popUpModal ? '.5rem' : '1.2rem')};
  cursor: pointer;
  position: relative;
  height: ${({ popUpModal }) => (popUpModal ? '2.5rem' : '3.9rem')};
  border: 1px solid transparent;
  border-radius: 50%;
  ${(props: StyleDayProp) =>
    props.period &&
    css`
      &:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(0, 0, 0, 0.05);
        top: 0;
        left: 0;
        z-index: 0;
        border: 1px solid rgba(0, 0, 0, 0);
      }
    `};
  ${(props: StyleDayProp) =>
    props.start &&
    css`
      border-radius: 50%;
      color: #fff;
      background-color: #333;
      &:after {
        border-radius: 50% 0 0 50%;
      }
    `};
  ${(props: StyleDayProp) =>
    props.end &&
    css`
      border-radius: 50%;
      color: #fff;
      background-color: #333;
      &:after {
        border-radius: 0 50% 50% 0;
      }
    `};
  ${(props: StyleDayProp) =>
    props.previous &&
    css`
      color: #bbb;
      cursor: default;
      pointer-events: none;
      user-select: none;
      border-radius: 100%;
    `};
  ${(props: StyleDayProp) =>
    props.previous === 0 &&
    css`
      &:hover {
        border-color: #333;
      }
    `};
`;
