import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { LabelInput } from '../../ui-util/LabelInput';
import { isOnClick } from "./SearchBar";


export const SearchDate = ({onClick}:isOnClick) => {

  return (
    <StyleSearchDate>
      <StyleFlexItems>
        <LabelInput
          type='text'
          title='체크인'
          value=''
          placeholder='날짜 추가'
          disabled={true}
          onClick={onClick}
        />
        <LabelInput
          type='text'
          title='체크아웃'
          value=''
          placeholder='날짜 추가'
          disabled={true}
          onClick={onClick}
        />
      </StyleFlexItems>
      <StyleResetButton>
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
