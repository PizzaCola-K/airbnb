import styled from 'styled-components';

interface MonthProp {
  date: Date;
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

export const Month = ({ date }: MonthProp) => {
  date.setDate(1);
  const startWeek = date.getDay(); // 시작 요일
  const lastDate = getLastDay(date); // 종료 일
  const days = new Array(startWeek).fill('').concat(
    Array(lastDate)
      .fill(0)
      .map((_, i) => i + 1)
  );
  const monthText =
    date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  return (
    <StyleMonth>
      <div className='title'>{`${date.getFullYear()}년 ${monthText}월`}</div>
      <div className='weeks'>
        {weeks.map((v, i) => (
          <div key={'week' + i}>{v}</div>
        ))}
      </div>
      <div className='days'>
        {days.map((v, i) => (
          <div key={i}>{v}</div>
        ))}
      </div>
    </StyleMonth>
  );
};

const StyleMonth = styled.div`
  width: 100%;
  padding: 0 1rem;
  .title {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .weeks {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
  }
  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    & > div {
      padding: 0.9rem;
      cursor: pointer;
    }
    & > div:nth-child(7n + 1) {
      color: red;
    }
    .end-date,
    .start-date {
      border-radius: 50%;
      color: #fff;
      background-color: #333;
    }
    .period {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background: rgba(0, 0, 0, 0.05);
      top: 0;
      left: 0;
      z-index: 0;
    }
    // ㅠㅠ
    // & > div:nth-child(7n) {
    //   color: blue;
    // }
  }
`;
