import styled from 'styled-components';
import { useEffect,useState, MouseEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SearchDate } from './SearchDate';
import { SearchPrice } from './SearchPrice';
import { SearchPersonnel } from './SearchPersonnel';
import PopUp from './popUp/PopUp';
import { usePopUpState, usePopUpDispatch } from '../../ui-util/PopUpContext';
import { CalendarContext } from '../../ui-util/CalendarContext';

export interface isOnClick {
  onClick:(e:MouseEvent<HTMLElement>) => void;
}

export const SearchBar = () => {
  const [className, setClassName] = useState<string>('');
  const popUpState = usePopUpState();
  const popUpDispatch = usePopUpDispatch();

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.search-bar') || target.closest('.pop-up')) return;
      popUpDispatch({ type: 'repeat' });
    });
    // return window.removeEventListener('click',() => {})
  }, []);

  // 클릭시 checkIn checkOut 구분해서 껏다켯다 and 바깥영역 클릭 시 꺼지기.
  const popUpON = (e:MouseEvent<HTMLElement>,option:string) => {
    const target = e.target as HTMLElement;
    const checkInAndOut = target.closest('.check-in') ? 'check-in' : 'check-out';
    const labelInput = target.closest('.label-input');
    if(popUpState.currentValue === `${option}ON`) {
      if(className === checkInAndOut && labelInput ) {
        popUpDispatch({type: `repeat`});
      } 
      else if(className !== checkInAndOut && labelInput ) {
        popUpDispatch({ type: `${option}ON`})
      }
      else popUpDispatch({type: `repeat`});
    } else popUpDispatch({ type: `${option}ON`});
    setClassName(checkInAndOut);
  }

  return (
    <StyleSearchBar className='search-bar'>
      <CalendarContext>
        <SearchDate onClick={(e) => popUpON(e, `calendar`)}></SearchDate>
        <SearchPrice onClick={(e) => popUpON(e, `price`)}></SearchPrice>
        <SearchPersonnel
          onClick={(e) => popUpON(e, `personnel`)}
        ></SearchPersonnel>
        <StyleSearchButton>
          <FaSearch />
        </StyleSearchButton>
        <PopUp popUpState={popUpState} />
      </CalendarContext>
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
`;

const StyleSearchButton = styled.button`
  background-color: #ff4545;
  border: 0;
  outline: 0;
  border-radius: 0 3rem 3rem 0;
  * {
    color: #fff;
  }
  svg {
    font-size: 1.25rem;
  }
`;
