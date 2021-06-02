import React from "react";
import styled from "styled-components";

const Bar = ({ height, index, range }) => {
  const barHeight = height;
  const left = range[0]
  const right = range[1]

  return (
    <StyledBar barStyle={barHeight} index={index} left={left} right={right}></StyledBar>
  );
};

export default Bar;

const StyledBar = styled.div`
  height: ${({ barStyle }) => `${barStyle}px`};
  width: 4%;
  background-color: ${({ index, left, right }) =>
     index < (left-50000) / 20000
      ? "#E5E5E5"
      :  index >= (right-50000) / 20000
      ? `#E5E5E5`
      : `black`};
`;
