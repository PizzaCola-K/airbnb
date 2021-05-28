import styled from 'styled-components';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io';
import { StandardProp, StyledStandardProp, optionProp } from '../../../../../ui-util/GlobalInterface';
import { usePersonnelDispatch } from '../../../../../ui-util/PersonnelContext';

const Standard = ({ table, index }: StandardProp) => {
  const dispatch = usePersonnelDispatch();
  const state = table.count;

  const Plus = () => {
    dispatch({index: index, counter: 1})
  };
  const Minus = () => {
    dispatch({index: index, counter: -1})
  }

  return (
    <StyledStandard table={table}>
      <div>
        <Title>{table.title}</Title>
        <Desc>{table.desc}</Desc>
      </div>
      <CountBox option={state} index={index}>
        <IoIosRemoveCircleOutline onClick={Minus} />
        <Count>{table.count}</Count>
        <IoIosAddCircleOutline onClick={Plus} />
      </CountBox>
    </StyledStandard>
  );
};

export default Standard;

const Count = styled.div``;
const CountBox = styled.div<optionProp>`
  position: absolute;
  width: 5rem;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > svg:first-child {
    pointer-events: ${({ option }) => option === 0 ? 'none' : null};
    color: ${({ option }) => option === 0 ? '#E0E0E0' : '#828282'};
  }

  > svg:last-child {
    pointer-events: ${({ option, index }) => 
      option === 5 && index !== 0 ? 'none' : 
      option === 16 && index === 0 ? 'none' : null};
    color: ${({ option, index}) => 
      option === 5 && index !== 0 ? '#E0E0E0' : 
      option === 16 && index === 0 ? '#E0E0E0' : '#828282'};
  }

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
