import styled from 'styled-components';

export const Destination = () => {
  const destinationList = [
    '집 전체',
    '독특한 공간',
    '농장 및 자연',
    '반려동물 동반 가능',
  ];

  return (
    <StyledDestination>
      <List>
        {destinationList.map((v, i) => {
          return (
            <li key={i}>
              <Link href='#'>
                <div>
                  <Image src={`/image/destination/${i + 1}.jpg`} />
                </div>
                <div>
                  <b>{v}</b>
                </div>
              </Link>
            </li>
          );
        })}
      </List>
    </StyledDestination>
  );
};

const StyledDestination = styled.div`
  padding: 5rem;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
`;

const Link = styled.a`
  color: black;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 1rem;
`;
