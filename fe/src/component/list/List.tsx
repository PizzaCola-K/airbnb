import { useState, useEffect,useContext } from 'react';
import styled from 'styled-components';
import Modal from '../modal/modal';
import { Stay } from './Stay';
import { CalendarDateContext, CalendarContext } from '../ui-util/CalendarContext';

interface Target {
  closest: HTMLElement | null;
}

interface StayInterface {
  id: number;
  imageUrl: string[];
  name: string;
  location: {
    latitude: number,
    longitude: number,
    address: string
  };
  likeCount: number;
  price: number;
  option: string;
  addtionalOption: string;
}

const getFormatDate = (date:Date):string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month + '월 ' + day + '일';
};

export const List = ({location}:any) => {
  console.log(location)

  const [stays, setStays] = useState<StayInterface[]>([]);

  useEffect(() => {
    const data = async () => {
      const result = await fetch('http://3.36.239.71/places').then(res => res.json());
      setStays(result);
    };
    data();
  },[]);

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
        <StyleStays>
          {stays && stays.map((stay, idx) => <Stay {...stay} key={stay.id} onShowModal={onShowModal} />)}
        </StyleStays>
      </div>
      <div />
      <CalendarContext>
        {modal.show && <Modal />}
      </CalendarContext>
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
