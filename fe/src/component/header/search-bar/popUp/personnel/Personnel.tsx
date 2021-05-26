import styled from 'styled-components';
import Standard from './standard/Standard';
import { useState } from 'react';

export interface person {
  title: string;
  count: number;
  desc: string;
  [key: string]: number | string;
}

const standard: Array<person> = [
  { title: '성인', count: 0, desc: '만 13세 이상' },
  { title: '어린이', count: 0, desc: '만 2세 이상' },
  { title: '유아', count: 0, desc: '만 2세 미만' },
];

const Personnel = () => {
  const [table, setTable] = useState(standard);
  const handleTableCount = (index: number, count: number) => {
    setTable((standard) => {
      //깊은 복사를 하지않으면 count가 2씩올라가는 이슈가 있었다 왜그런거지?
      const newStandard = standard.map((v) => {
        return { ...v };
      });
      newStandard[index].count += count;
      return newStandard;
    });
    // 1만 오르고
    // const newStandard = [...standard];
    // newStandard[index].count += count;
    // setTable(newStandard);
  };
  const personnel = () => {
    return table.map((v, i) => (
      <Standard
        key={i}
        table={v}
        index={i}
        handleTableCount={handleTableCount}
      />
    ));
  };
  return <StyledPersonnel>{personnel()}</StyledPersonnel>;
};

export default Personnel;

const StyledPersonnel = styled.div`
  padding: 2.5rem 2rem;
`;
