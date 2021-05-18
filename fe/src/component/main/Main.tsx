import styled from 'styled-components';
import { Destination } from './Destination';
import { Footer } from './Footer';
import { Recommendation } from './Recommendation';

export const Main = () => {
  return (
    <>
      <StyleHeroImage />
      <StyleMain>
        <Recommendation />
        <Destination />
      </StyleMain>
      <Footer />
    </>
  );
};

const StyleHeroImage = styled.div`
  background-image: url('/image/heroimage.jpg');
  background-size: cover;
  background-position: 50% 100%;
  width: 100%;
  height: 90vh;
`;

const StyleMain = styled.div``;
