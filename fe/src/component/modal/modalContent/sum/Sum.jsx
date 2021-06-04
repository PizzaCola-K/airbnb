import styled from 'styled-components';

const Sum = () => {
  return (
    <StyledSum>
      <ChargeTable>
        <li>
          <div>₩58,000 x 1박</div>
          <div>₩58,000</div>
        </li>
        <li>
          <div className='under-line'>서비스 수수료</div>
          <div>₩8,188</div>
        </li>
        <li>
          <div className='under-line'>숙박세와 수수료</div>
          <div>₩819</div>
        </li>
      </ChargeTable>
      <AllSum>
        <div>총 합계</div>
        <div>₩67,007</div>
      </AllSum>
    </StyledSum>
  );
};

export default Sum;

const AllSum = styled.div`
  display: flex;
  justify-content: space-between;
  color: #333;
  font-weight: 600;
  border-top: 2px solid #e0e0e0;
  padding-top: 1rem;
  &:first-child {
    text-decoration-line: underline;
  }
`;

const ChargeTable = styled.ul`
  margin-top: 0.25rem;
  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .under-line {
    text-decoration: underline;
  }
`;

const StyledSum = styled.div`
  padding: 1.5rem;
  padding-top: 0;
`;
