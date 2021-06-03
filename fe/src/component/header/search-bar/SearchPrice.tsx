import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { LabelInput } from '../../ui-util/LabelInput';
import { isOnClick } from './SearchBar';
import { usePriceState } from '../../ui-util/PriceContext'

export const SearchPrice = ({ onClick }: isOnClick) => {
  const price = usePriceState();
  
  const showPrice = () => {
    if(price.range === [[],[]]) return '금액대 설정'
    return `${price.range[0]}원 ~ ${price.range[1]}원`
  }

  return (
    <StyleSearchPrice>
      <div>
        <LabelInput
          type='text'
          title='요금'
          value={showPrice()}
          placeholder='금액대 설정'
          disabled={true}
          onClick={onClick}
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
  display: flex;
  top: calc(50% - 0.875rem);
  right: 1rem;
  padding: 0.5rem;
  background-color: #f5f5f7;
  border-radius: 50%;
  font-size: 0.75rem;
`;
