import styled from 'styled-components';

const recommendationList = [
  { title: '서울', description: '차로 30분 거리' },
  { title: '인천', description: '차로 30분 거리' },
  { title: '의정부시', description: '차로 45분 거리' },
  { title: '대전', description: '차로 2.5시간 거리' },
  { title: '대구', description: '차로 4시간 거리' },
  { title: '고양시', description: '차로 30분 거리' },
  { title: '부천시', description: '차로 15분 거리' },
  { title: '수원시', description: '차로 45분 거리' },
];

export const Recommendation = () => {
  return (
    <StyleRecommendation>
      <StyleTitle>가까운 여행지 둘러보기</StyleTitle>
      <StyleList>
        {recommendationList.map((item, idx) => (
          <li key={item.title}>
            <a>
              <img src={`./image/recommendation/${idx + 1}.jpg`} />
              <span>
                <span>{item.title}</span>
                <span>{item.description}</span>
              </span>
            </a>
          </li>
        ))}
      </StyleList>
    </StyleRecommendation>
  );
};

const StyleRecommendation = styled.div`
  padding: 5rem;
`;

const StyleTitle = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 2rem;
`;

const StyleList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  li {
    padding: 10px 0;
    a {
      display: flex;
      align-items: center;
    }
    img {
      width: 64px;
      max-width: 100%;
      border-radius: 10px;
      margin-right: 16px;
    }
    span {
      span:first-child {
        display: block;
        font-weight: 600;
      }
      span:last-child {
        display: block;
      }
    }
  }
`;
