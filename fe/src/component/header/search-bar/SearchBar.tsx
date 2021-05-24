import styled from 'styled-components';
import React, { useReducer } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SearchDate } from './SearchDate';
import { SearchPrice } from './SearchPrice';
import { SearchPersonnel } from './SearchPersonnel';
import PopUp from './popUp/PopUp';

export interface isOnClick {
  onClick(): void;
}

export interface State {
  calendarPopUp: boolean;
  pricePopUp: boolean;
  personnelPopUp: boolean;
  currentValue: String;
}

const initialState: State = {
  calendarPopUp: false,
  pricePopUp: false,
  personnelPopUp: false,
  currentValue: '',
};

interface Action {
  type: String;
}

const popUpReducer = (state: any, action: Action) => {
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

  // 클릭시 checkIn checkOut 구분해서 껏다켯다 and 바깥영역 클릭 시 꺼지기.
  const popUpON = (option: String) => {
    if (popUpState.currentValue === `${option}ON`)
      return dispatch({ type: `repeat` });
    return dispatch({ type: `${option}ON` });
  };

  return (
    <StyleSearchBar>
      <SearchDate onClick={() => popUpON(`calendar`)}></SearchDate>
      <SearchPrice onClick={() => popUpON(`price`)}></SearchPrice>
      <SearchPersonnel onClick={() => popUpON(`personnel`)}></SearchPersonnel>
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
