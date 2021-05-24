import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../modal/modal';
import { Stay } from './Stay';

interface Target {
  closest: HTMLElement | null;
}

export const List = () => {
  const stays = [
    'https://a0.muscache.com/im/pictures/17f793ce-a4fe-4e9f-b746-81e9235fac45.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/32e8b4a0-83ff-4dba-8253-5340d8d05215.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/2d0b0de2-0b36-4f1a-97a9-7a94921ca5f2.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/591dcc36-03ab-4db9-b0bf-a50c88e288e1.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/86a34ef9-cf2c-4d42-8133-668ef97b2581.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/f6dc0193-48c5-4c99-abfd-140ea2c2fdf2.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/bb4f945a-32f4-40e9-8d2d-9f6fd2cb3604.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/b538f736-29b9-4626-8eea-81284704b403.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/cd63d697-b3ae-4b09-a282-499a47e50f7b.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/b11dde26-5744-4ed9-953c-71c51c5a1bf8.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/dcb192e5-8798-468a-b3ea-c41bfbadd130.jpg?im_w=720',
  ];
  const [modal, setModal] = useState({
    show: false,
    data: '',
  });
  const onShowModal = (event: React.MouseEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    const closest = target.closest('button');
    if (closest) return;
    else setModal({ show: true, data: '' });
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
          {stays.map((stay, idx) => (
            <Stay images={[stay]} key={idx} onShowModal={onShowModal} />
          ))}
        </StyleStays>
      </div>
      <div />
      {modal.show && <Modal data={modal.data} />}
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
