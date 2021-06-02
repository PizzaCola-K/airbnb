import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import Bar from "./Bar";
import InputSlide from "./InputSlide/InputSlide";

const Price = () => {
  const [state, setState] = useState("");
  let { list, minPrice, maxPrice } = state;
  const [range, setRange] = useState([[],[]]);

  useEffect(async () => {
    const data = await fetch(
      "https://codesquad-2021-api.herokuapp.com/airbnb/price"
    ).then((res) => res.json());
    setState(data);
    setRange([[Number(data.minPrice)],[Number(data.maxPrice)]])
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
      <PriceInfo>
        <div>가격범위</div>
        <div>{range&&priceRange()}</div>
      </PriceInfo>
      {range && <StyleChart>
        <StyledChart>{state && <StyledBar>{barRender()}</StyledBar>}</StyledChart>
        <InputSlide minPrice={minPrice} maxPrice={Number(maxPrice)} price={range} onChange={setRange} />
      </StyleChart>}
    </div>    
  );
};

export default Price;

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
  height: 100px;
  position: relative;
`;

const StyledBar = styled.div`
  width: 100%;
  display: flex;
  flex-flow: wrap-reverse;
  position: absolute;
  bottom: 0;
`;

const StyleChart = styled.div`
  width:80%;
  padding: 2rem 0;
  margin:auto;
  text-align: -webkit-center;
`
