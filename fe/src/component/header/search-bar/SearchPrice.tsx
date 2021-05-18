import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { LabelInput } from '../../ui-util/LabelInput';

export const SearchPrice = () => {
  return (
    <StyleSearchPrice>
      <div>
        <LabelInput
          type='text'
          title='요금'
          value=''
          placeholder='금액대 설정'
          disabled={true}
        />
      </div>
      <StyleResetButton>
        <FaTimes />
      </StyleResetButton>
    </StyleSearchPrice>
  );
};

const StyleSearchPrice = styled.div`
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
