import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return <StyleLogo to={'/'}>LOGO</StyleLogo>;
};

const StyleLogo = styled(Link)`
  font-size: 1.5rem;
`;
