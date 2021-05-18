import styled from 'styled-components';
import { FaUser, FaBars } from 'react-icons/fa';

export const LoginButton = () => {
  return (
    <StyleLoginButton>
      <FaBars />
      <FaUser />
    </StyleLoginButton>
  );
};

const StyleLoginButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 40px;
  background: rgb(255, 255, 255);
  gap: 8px;
  border-radius: 20px;
  padding: 0px 12px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(210, 210, 210);
  border-image: initial;
  outline: none;
  &:hover {
    border-color: #333;
  }
`;
