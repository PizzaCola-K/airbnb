import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { useContext } from 'react';
import { LabelInput } from '../../ui-util/LabelInput';
import { isOnClick } from './SearchBar';
import { CalendarDateContext } from '../../ui-util/CalendarContext';

const getFormatDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return month + '월 ' + day + '일';
};

export const SearchDate = ({ onClick }: isOnClick) => {
  const [selectedDate, dispatch] = useContext(CalendarDateContext);
  const startDate = selectedDate?.startDate;
  const endDate = selectedDate?.endDate;
  const formatStartDate: string = startDate ? getFormatDate(startDate) : '';
  const formatEndDate: string = endDate ? getFormatDate(endDate) : '';

  const resetDate = () => {
    if (dispatch) dispatch({ type: 'RESET', value: new Date() });
  };

  return (
    <StyleSearchDate>
      <StyleFlexItems>
        <LabelInput
          className='check-in'
          type='text'
          title='체크인'
          value={formatStartDate}
          placeholder='날짜 추가'
          disabled={true}
          onClick={onClick}
        />
        <LabelInput
          className='check-out'
          type='text'
          title='체크아웃'
          value={formatEndDate}
          placeholder='날짜 추가'
          disabled={true}
          onClick={onClick}
        />
      </StyleFlexItems>
      <StyleResetButton onClick={resetDate}>
        <FaTimes />
      </StyleResetButton>
    </StyleSearchDate>
  );
};

const StyleSearchDate = styled.div`
  position: relative;
`;

const StyleFlexItems = styled.div`
  display: flex;
  & > * {
    width: 50%;
  }
`;

const StyleResetButton = styled.div`
  position: absolute;
  cursor: pointer;
  display: flex;
  top: calc(50% - 0.875rem);
  right: 1rem;
  padding: 0.5rem;
  background-color: #f5f5f7;
  border-radius: 50%;
  font-size: 0.75rem;
`;
