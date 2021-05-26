import styled from 'styled-components';
import { MouseEvent } from 'react';
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from 'react-icons/io';
import { person } from '../Personnel';

interface StandardProp {
  table: person;
  index: number;
  handleTableCount: (index: number, count: number) => void;
}

interface StyledStandardProp {
  table: person;
}

const Standard = ({ table, handleTableCount, index }: StandardProp) => {
  const plus = () => {
    handleTableCount(index, 1);
  };
  const minus = () => {
    handleTableCount(index, -1);
  };
  return (
    <StyledStandard table={table}>
      <div>
        <Title>{table.title}</Title>
        <Desc>{table.desc}</Desc>
      </div>
      <CountBox>
        <IoIosRemoveCircleOutline onClick={minus} />
        <Count>{table.count}</Count>
        <IoIosAddCircleOutline onClick={plus} />
      </CountBox>
    </StyledStandard>
  );
};

export default Standard;

const Count = styled.div``;
const CountBox = styled.div`
  position: absolute;
  width: 5rem;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > svg {
    color: #828282;
    width: 1.875rem;
    height: 1.875rem;
  }
`;

const StyledStandard = styled.div<StyledStandardProp>`
  position:relative;
  display: flex;
  align-items:center;
  border: ${({ table }) =>
    table.title === '어린이' ? `1px solid #C4C4C4` : null};
  };
  padding: ${({ table }) =>
    table.title === '성인'
      ? '0 0 1rem 0'
      : table.title === '어린이'
      ? '1rem 0'
      : '1rem 0 0 0'};
  border-width: 1px 0;
  margin:auto;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 23px;
`;
const Desc = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #828282;
`;
