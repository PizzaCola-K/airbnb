import styled from 'styled-components';
import { useReducer, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SearchDate } from './SearchDate';
import { SearchPrice } from './SearchPrice';
import { SearchPersonnel } from './SearchPersonnel';
import PopUp from './popUp/PopUp';

export interface isOnClick {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface State {
  calendarPopUp: boolean;
  pricePopUp: boolean;
  personnelPopUp: boolean;
  currentValue: String;
  currentClass?: String;
}

const initialState: State = {
  calendarPopUp: false,
  pricePopUp: false,
  personnelPopUp: false,
  currentValue: '',
  currentClass: '',
};

interface Action {
  type: String;
}

const popUpReducer = (state: State, action: Action) => {
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
      return {
        calendarPopUp: false,
        pricePopUp: false,
        personnelPopUp: false,
        currentValue: '',
      };
  }
};

export const SearchBar = () => {
  const [popUpState, dispatch] = useReducer(popUpReducer, initialState);
  const [className, setClassName] = useState<string>('');

  useEffect(() => {
    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.search-bar') || target.closest('.pop-up')) return;
      dispatch({ type: 'repeat' });
    });
    // return window.removeEventListener('click',() => {})
  }, []);

  // 클릭시 checkIn checkOut 구분해서 껏다켯다 and 바깥영역 클릭 시 꺼지기.
  const popUpON = (e: React.MouseEvent<HTMLElement>, option: String) => {
    const targetClass = (e.target as Element).classList[2];
    console.log('e.target : ', targetClass);
    console.log('className : ', className);
    if (popUpState.currentValue === `${option}ON`) {
      if (className === targetClass) dispatch({ type: `repeat` });
      else if (className !== targetClass) dispatch({ type: `${option}ON` });
      else dispatch({ type: `repeat` });
    } else {
      dispatch({ type: `${option}ON` });
    }
    setClassName(targetClass);
  };

  return (
    <StyleSearchBar className='search-bar'>
      <SearchDate onClick={(e) => popUpON(e, `calendar`)}></SearchDate>
      <SearchPrice onClick={(e) => popUpON(e, `price`)}></SearchPrice>
      <SearchPersonnel
        onClick={(e) => popUpON(e, `personnel`)}
      ></SearchPersonnel>
      <StyleSearchButton>
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
