import styled from "styled-components";
import { Range, getTrackBackground } from "react-range";

const InputSlide = ({minPrice, maxPrice, price, onChange }) => {
  return (
    <Range
      allowOverlap={true}
      draggableTrack
      step={20000}
      min={minPrice}
      max={maxPrice}
      values={price}
      onChange={(values) => onChange(values)}
      renderTrack={({props,children}) => (
        <StyledRangeTrack {...props} min={minPrice} max={maxPrice} price={price} >
          {children}
        </StyledRangeTrack>
      )}
      renderThumb={({ props }) => <StyledRangeThumb {...props} />}
    />
  );
};

export default InputSlide;

const StyledRangeTrack = styled.div`
  position: relative;
  height: 5px;
  width: 100%;
  border-radius: 4px;
  margin-top: 1.5rem;
  pointer-events: none;
  background: ${(props) =>
    getTrackBackground({
      values: props.price,
      colors: ["transparent", "black", "transparent"],
      min: props.min,
      max: props.max,
    })};
  align-self: center;
  cursor: default;
`;

const StyledRangeThumb = styled.div`
  pointer-events: all;
  position: absolute;
  top: 0;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 24px;
  border: 1px solid black;
  background-color: black;
  backface-visibility: hidden;
  outline: none;
  cursor: default;
`;
