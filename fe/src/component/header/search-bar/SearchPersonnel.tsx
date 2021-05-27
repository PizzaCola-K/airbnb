import styled, { ThemeProvider } from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { LabelInput } from '../../ui-util/LabelInput';
import { isOnClick } from '../search-bar/SearchBar';
import { usePersonnelState } from '../../ui-util/PersonnelContext'

export const SearchPersonnel = ({ onClick }: isOnClick) => {
  const state = usePersonnelState().map((v) => v.count);
  const personnel = state[0]+state[1];
  const baby = state[2];

  const value = () => {
    if(personnel>0 && baby===0) return `게스트 ${personnel}명`;
    else if(baby>0 && personnel===0) return `유아 ${baby}명`;
    else if(personnel>0 && baby>0) return `게스트 ${personnel}명, 유아 ${baby}명`;
    return '';
  }

  return (
    <StyleSearchPersonnel>
      <div>
        <LabelInput
          type='text'
          title='인원'
          value={value()}
          placeholder= '게스트 추가'
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
  display: flex;
  top: calc(50% - 0.875rem);
  right: 1rem;
  padding: 0.5rem;
  background-color: #f5f5f7;
  border-radius: 50%;
  font-size: 0.75rem;
`;
