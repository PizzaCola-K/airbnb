import styled, { keyframes }  from "styled-components";
import { useEffect, useState } from "react";
import Bar from "./Bar";
import InputSlide from "./InputSlide/InputSlide";
import { usePriceState } from '../../../../ui-util/PriceContext'

const Price = () => {
  const [state, setState] = useState("");
  let { list, minPrice, maxPrice } = state;
  const {range, setRange} = usePriceState();
  
  useEffect(async () => {
    const data = await fetch(
      "https://codesquad-2021-api.herokuapp.com/airbnb/price"
    );
    const response = await data.json();
    setState(response);
    if(range[0][0] !== 0) return;
    setRange([[Number(response.minPrice)],[Number(response.maxPrice)]])
  }, []);

  const barRender = () => {
    const priceDistribution = Array(25).fill(0);
    list.forEach((v) => {
      priceDistribution[parseInt((v - 50000) / 20000)] += Number(1);
    });
    return priceDistribution.map((v, i) => {
      return <Bar key={i} height={v} index={i} range={range} />;
    });
  };

  const priceRange = () => {
      return `₩${range[0]} ~ ₩${range[1]}`
  }
  return (
    <div>
      {range[0][0] === 0 ? (
        <StyledSpinner>
          <Spinner></Spinner>
          <p>그래프 로딩중...✨</p>
        </StyledSpinner>
      ) : 
      <>
          <PriceInfo>
            <div>가격범위</div>
            <StyledPrice>{priceRange()}</ StyledPrice>
          </PriceInfo>
          <StyleChart>
            <StyledChart>{state && <StyledBar>{barRender()}</StyledBar>}</StyledChart>
            <InputSlide minPrice={minPrice} maxPrice={Number(maxPrice)} price={range} onChange={setRange} />
          </StyleChart>
        </>
      }
    </div>    
  );
};

export default Price;

const spin = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledPrice = styled.div`
  padding-bottom:1rem;
`;

const StyledSpinner = styled.div`
  padding: 2rem 0;
  text-align: center;
`;

const Spinner = styled.div`
  border: 0.75rem solid #ddd;
  border-top-color: #333;
  border-radius: 50%;
  margin: auto;
  margin-bottom: 2rem;
  width: 5rem;
  height: 5rem;
  animation: ${spin} 1s linear infinite;
`;

const PriceInfo = styled.div`
  position:relative;
  z-index:2;
  top:2rem;
  width:80%;
  margin:auto;
`;

const StyledChart = styled.div`
  width: 100%;
  z-index: 1;
  background: white;
  position: relative;
`;

const StyledBar = styled.div`
  width: 100%;
  display: flex;
  flex-flow: wrap-reverse;
`;

const StyleChart = styled.div`
  width:80%;
  padding: 2rem 0;
  margin:auto;
  text-align: -webkit-center;
`
