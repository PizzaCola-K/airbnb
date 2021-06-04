import styled from 'styled-components';
import { useEffect, useState, useMemo } from 'react';
import Bar from './Bar';
import InputSlide from './InputSlide/InputSlide';

interface stateType {
  list: number[];
  minPrice: number;
  maxPrice: number[];
}

const initState: stateType = {
  list: [],
  minPrice: 0,
  maxPrice: [],
};

const Price = () => {
  const [state, setState] = useState<stateType>(initState);
  const { list, minPrice, maxPrice } = state;
  const [range, setRange] = useState([[0], [100]]);

  useEffect(() => {
    const data = async () => {
      const price = await fetch(
        'https://codesquad-2021-api.herokuapp.com/airbnb/price'
      ).then((res) => res.json());
      setState(price);
    };
    data();
  }, []);

  const priceDistribution: Array<number> = Array(25).fill(0);
  list.forEach((v: number) => {
    priceDistribution[parseInt(String((v - 50000) / 20000))] += 1;
  });

  const barRender = () => {
    return priceDistribution.map((v, i) => {
      return <Bar key={i} height={v} index={i + 1} range={range} />;
    });
  };

  return (
    <>
      <StyledChart>{state && <StyledBar>{barRender()}</StyledBar>}</StyledChart>
      <InputSlide
        min={0}
        max={100}
        step={1}
        price={range}
        onChange={setRange}
      />
    </>
  );
};

export default Price;

const StyledChart = styled.div`
  width: 80%;
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
