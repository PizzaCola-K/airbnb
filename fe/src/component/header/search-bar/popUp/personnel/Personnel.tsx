import styled from 'styled-components';
import Standard from './standard/Standard';
import { usePersonnelState } from '../../../../ui-util/PersonnelContext';

const Personnel = () => {
  const table = usePersonnelState();
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
