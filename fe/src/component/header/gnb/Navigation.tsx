import styled from 'styled-components';

export const Navigation = () => {
  return (
    <StyleNavigation>
      <a>숙소</a>
      <a>체험</a>
      <a>온라인 체험</a>
    </StyleNavigation>
  );
};

const StyleNavigation = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  a {
    color: #333;
    opacity: 0.9;
    font-weight: 600;
    cursor: pointer;
  }
  a:hover {
    opacity: 1;
  }
`;
