import styled from "styled-components";
import { Range, getTrackBackground } from "react-range";

const InputSlide = ({ min, max, step, price, onChange }) => {
  // console.log(price)
  return (
    <Range
      draggableTrack
      step={step}
      min={min}
      max={max}
      values={price}
      onChange={(values) => onChange(values)}
      renderTrack={({props,children}) => (
        <StyledRangeTrack {...props} min={min} max={max} price={price} >
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
  width: 80%;
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