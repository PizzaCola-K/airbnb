import styled from 'styled-components';

export const Footer = () => {
  return (
    <StyledFooter>
      <Lists>
        <li>
          <b>소개</b>
        </li>
        <li>에어비앤비 이용 방법</li>
        <li>뉴스룸</li>
        <li>투자자 정보</li>
        <li>에어비앤비 플러스</li>
        <li>에어비앤비 Luxe</li>
        <li>호텔투나잇</li>
        <li>에어비앤비 비즈니스 프로그램</li>
        <li>올림픽</li>
        <li>채용정보</li>
      </Lists>
      <Lists>
        <li>
          <b>커뮤니티</b>
        </li>
        <li>다양성 및 소속감</li>
        <li>접근성</li>
        <li>에어비앤비 어소시에이트</li>
        <li>구호인력을 위한숙소</li>
        <li>친구 초대하기</li>
        <li>Airbnb.org</li>
      </Lists>
      <Lists>
        <li>
          <b>호스팅하기</b>
        </li>
        <li>숙소 호스팅</li>
        <li>온라인 체험 호스팅하기</li>
        <li>체험 호스팅하기</li>
        <li>책임감 있는 호스팅</li>
        <li>자료센터</li>
        <li>커뮤니티 센터</li>
      </Lists>
      <Lists>
        <li>
          <b>에어비앤비 지원</b>
        </li>
        <li>에어비엔비의 코로나19 대응 방안</li>
        <li>도움말 센터</li>
        <li>예약 취소 옵션</li>
        <li>에어비앤비 이웃 민원 지원</li>
        <li>신뢰와 안전</li>
      </Lists>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  padding: 5rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  background-color: #f7f7f7;
  border-top: 1px solid #eae8e8;
`;

const Lists = styled.ul`
  padding: 0;
  margin: 0;
  > li {
    padding-bottom: 10px;
  }
`;
