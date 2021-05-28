import styled from 'styled-components';
import ModalContent from './modalContent/ModalContent';
import { useContext } from 'react';
import { CalendarDateContext } from '../ui-util/CalendarContext';

const getFormatDate = (date:Date):string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month + '월 ' + day + '일';
};

const Modal = () => {
  const selectedDate = useContext(CalendarDateContext)[0];
  const startDate = selectedDate?.startDate;
  const endDate = selectedDate?.endDate;
  const formatStartDate:string = startDate ? getFormatDate(startDate) : '';
  const formatEndDate:string = endDate ? getFormatDate(endDate) : '';

  console.log(startDate,endDate);

  return (
    <StyledModal>
      <ModalContent />
    </StyledModal>
  );
};

export default Modal;

const StyledModal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;
