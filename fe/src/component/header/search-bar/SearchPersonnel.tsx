import styled, { ThemeProvider } from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { LabelInput } from '../../ui-util/LabelInput';
import { isOnClick } from "../search-bar/SearchBar";

export const SearchPersonnel = ({onClick}:isOnClick) => {

  return (
    <StyleSearchPersonnel>
      <div>
        <LabelInput
          type='text'
          title='인원'
          value=''
          placeholder='게스트 추가'
          disabled={true}
          onClick={onClick}
        />
      </div>
      <StyleResetButton>
        <FaTimes />
      </StyleResetButton>
    </StyleSearchPersonnel>
  );
};

const StyleSearchPersonnel = styled.div`
  position: relative;
  & > div {
    display: flex;
  }
`;

const StyleResetButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: calc(50% - 0.875rem);
  right: 1rem;
  padding: 0.5rem;
  background-color: #f5f5f7;
  border-radius: 50%;
  font-size: 0.75rem;
`;
