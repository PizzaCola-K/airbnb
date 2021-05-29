import { useState, useEffect, createContext, useReducer, useContext } from 'react';
import styled from 'styled-components';
import { Stay } from './Stay';
import { Location, StayInterface, priceState, priceAction, priceDispatch } from '../ui-util/GlobalInterface';
import Modal from '../modal/modal';
import { CalendarContext } from '../ui-util/CalendarContext';

export const ModalContext = createContext<[string,string] | null>(null);
export const priceStateContext = createContext<priceState | null>(null);
export const priceDispatchContext = createContext<priceDispatch | null>(null);

const initPrice:priceState = {
  price: 0,
}

const priceReducer = (state: priceState, action:priceAction):typeof initPrice => {
  const newState:typeof initPrice = {...state};
  newState.price = action.price;
  return newState;
}

export const usePriceState = ():priceState => {
  const priceState = useContext(priceStateContext);
  if (!priceState) throw new Error('Cannot find SampleProvider');
  return priceState;
}

export const usePriceDispatch = ():priceDispatch => {
  const dispatch = useContext(priceDispatchContext);
  if (!dispatch) throw new Error('Cannot find SampleProvider');
  return dispatch;
};

const getFormatDate = (date:Date):string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month + '월 ' + day + '일';
};

export const List = ({location}:Location) => {
  const [stays, setStays] = useState<StayInterface[]>([]);
  const startDate = getFormatDate(new Date(location.state.startDate));
  const endDate = getFormatDate(new Date(location.state.endDate));
  const [price, priceDispatch] = useReducer(priceReducer,initPrice);
  
  useEffect(() => {
    const data = async () => {
      const result = await fetch('http://3.36.239.71/places').then((res) =>
        res.json()
      );
      setStays(result);
    };
    data();
  }, []);

  const [modal, setModal] = useState({show: false});
  const onShowModal = (event: React.MouseEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    const closest = target.closest('button');
    if (closest) return;
    else setModal({ show: true });
  };
  const onListClick = (event: React.MouseEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    const closest = target.closest('.modal-content');
    if (modal.show && !closest) setModal({ ...modal, show: false });
  };

  return (
    <StyleList onClick={(e) => onListClick(e)}>
      <div>
        <StyleSearchCategories>
          <span>300개 이상의 숙소</span>
          <span>5월 12일 - 5월 18일</span>
          <span>₩100,000 ~ ₩1,000,000</span>
          <span>게스트 3명</span>
        </StyleSearchCategories>
        <h1>지도에서 선택한 지역의 숙소</h1>
          <CalendarContext>
            <StyleStays>
            <priceDispatchContext.Provider value={priceDispatch}>
              {stays &&
                stays.map((stay, idx) => (
                  <Stay key={stay.id} {...stay} onShowModal={onShowModal}/>
                ))}
              </priceDispatchContext.Provider>
            </StyleStays>
          </CalendarContext>
      </div>
      <ModalContext.Provider value={[startDate,endDate]}>
        <priceStateContext.Provider value={price}>
          {modal.show && price && <Modal />}
        </priceStateContext.Provider>
      </ModalContext.Provider>
    </StyleList>
  );
};

const StyleList = styled.div`
  padding: 1.25rem 5rem 1.25rem;
  padding-top: 12rem;
  h1 {
    margin: 0.5rem 0;
  }
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StyleSearchCategories = styled.div`
  font-size: 0.75rem;
  & > *:not(:last-child) {
    padding-right: 1rem;
    position: relative;
    &:before {
      content: '';
      width: 0.125rem;
      height: 0.125rem;
      background-color: #333;
      border-radius: 50%;
      position: absolute;
      right: 0.5rem;
      top: calc(50% - 0.125rem);
    }
  }
`;

const StyleStays = styled.ul``;
