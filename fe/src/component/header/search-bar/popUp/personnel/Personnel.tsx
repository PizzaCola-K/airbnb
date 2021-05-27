import styled from 'styled-components';
import { useEffect } from 'react';
import Standard from './standard/Standard';
import { usePersonnelState, usePersonnelDispatch } from '../../../../ui-util/PersonnelContext';

const Personnel = () => {
  const table = usePersonnelState();
  const dispatch = usePersonnelDispatch();
  const comparison = table.map(v => v.count);

  useEffect(() => {
    if(comparison[0]===0 && (comparison[1] === 1 || comparison[2] === 1)) {
      dispatch({index: 0, counter: 1});
    }
  },[table]);

  const personnel = () => {
    return table.map((v, i) => (
      <Standard
        key={i}
        table={v}
        index={i}
      />
    ));
  };
  return <StyledPersonnel>{personnel()}</StyledPersonnel>;
};

export default Personnel;

const StyledPersonnel = styled.div`
  padding: 2.5rem 2rem;
`;
