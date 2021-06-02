import styled from 'styled-components';
import { useEffect, useState, MouseEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { SearchDate } from './SearchDate';
import { SearchPrice } from './SearchPrice';
import { SearchPersonnel } from './SearchPersonnel';
import PopUp from './popUp/PopUp';
import { usePopUpState, usePopUpDispatch } from '../../ui-util/PopUpContext';
import { CalendarDateContext } from '../../ui-util/CalendarContext';

export interface isOnClick {
  onClick: (e: MouseEvent<HTMLElement>) => void;
}

const getFormatDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month + '-' + day;
};

export const SearchBar = () => {
  const [className, setClassName] = useState<string>('');
  const popUpState = usePopUpState();
  const popUpDispatch = usePopUpDispatch();
  const selectedDate = useContext(CalendarDateContext)[0];
  const startDate = selectedDate?.startDate;
  const endDate = selectedDate?.endDate;
  const formatStartDate: string = startDate ? getFormatDate(startDate) : '';
  const formatEndDate: string = endDate ? getFormatDate(endDate) : '';

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.search-bar') || target.closest('.pop-up')) return;
      popUpDispatch({ type: 'repeat' });
    });
    // return window.removeEventListener('click',() => {})
  }, []);

  // 클릭시 checkIn checkOut 구분해서 껏다켯다 and 바깥영역 클릭 시 꺼지기.
  const popUpON = (e: MouseEvent<HTMLElement>, option: string) => {
    const target = e.target as HTMLElement;
    const checkInAndOut = target.closest('.check-in')
      ? 'check-in'
      : 'check-out';
    const labelInput = target.closest('.label-input');
    if (popUpState.currentValue === `${option}ON`) {
      if (className === checkInAndOut && labelInput) {
        popUpDispatch({ type: `repeat` });
      } else if (className !== checkInAndOut && labelInput) {
        popUpDispatch({ type: `${option}ON` });
      } else popUpDispatch({ type: `repeat` });
    } else popUpDispatch({ type: `${option}ON` });
    setClassName(checkInAndOut);
  };

  return (
    <StyleSearchBar className='search-bar'>
      <SearchDate onClick={(e) => popUpON(e, `calendar`)}></SearchDate>
      <SearchPrice onClick={(e) => popUpON(e, `price`)}></SearchPrice>
      <SearchPersonnel
        onClick={(e) => popUpON(e, `personnel`)}
      ></SearchPersonnel>
      {/* 라우터 */}
      <StyleSearchButton
        to={{
          pathname: '/list',
          search: `?check-in=${formatStartDate}&check-out=${formatEndDate}`,
          // hash: "#the-hash",
          state: { startDate: startDate, endDate: endDate },
        }}
      >
        <FaSearch />
      </StyleSearchButton>
      <PopUp popUpState={popUpState} />
    </StyleSearchBar>
  );
};

const StyleSearchBar = styled.div`
  width: 60vw;
  margin: 0 auto;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 40% 30% 20% 10%;
  background: #fff;
  border-radius: 3rem;
  position: relative;
  .label-input:hover {
    background-color: #f1f1f1;
    border-radius: 2rem;
  }
`;

const StyleSearchButton = styled(Link)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff4545;
  border: 0;
  outline: 0;
  border-radius: 0 3rem 3rem 0;
  z-index: 1;
  * {
    color: #fff;
  }
  svg {
    font-size: 1.25rem;
  }
`;