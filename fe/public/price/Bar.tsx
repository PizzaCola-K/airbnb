import styled from 'styled-components';

interface BarType {
  height: number;
  index: any;
  range: number[][];
  [key: string]: number | number[] | number[][] | string | undefined;
}

const Bar = ({ height, index, range }: BarType) => {
  const barHeight = height;
  return (
    <StyledBar barStyle={barHeight} index={index} range={range}></StyledBar>
  );
};

export default Bar;

const StyledBar = styled.div<BarType>`
  height: ${({ barStyle }) => `${barStyle}px`};
  width: 4%;
  background-color: ${({ index, range }) => {
    return index === range[0][0] / 4 || index < range[0][0] / 4
      ? '#E5E5E5'
      : index === range[1][0] / 4 || index > range[1][0] / 4
      ? `#E5E5E5`
      : `#333`;
  }};
  border-bottom: 5px solid #333;
  border-bottom-color: ${({ index, range }) => {
    return index === range[0][0] / 4 || index < range[0][0] / 4
      ? '#E5E5E5'
      : index === range[1][0] / 4 || index > range[1][0] / 4
      ? `#E5E5E5`
      : `#333`;
  }};
`;
