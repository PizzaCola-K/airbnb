import styled from 'styled-components';
import { FaUser, FaBars } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export const LoginButton = () => {
  const [toggle, setToggle] = useState(false);
  const onToggleLoginModal = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    document.body.addEventListener('click', onCloseLoginModal);
    return function cleanup() {
      window.removeEventListener('click', onCloseLoginModal);
    };
  }, []);
  const onCloseLoginModal = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    !target.closest('.login-modal') && setToggle(false);
  };
  return (
    <StyleLoginButtonWrap>
      <StyleLoginButton className='login-modal' onClick={onToggleLoginModal}>
        <FaBars />
        <FaUser />
      </StyleLoginButton>
      {toggle && (
        <StyleLoginModal className='login-modal'>
          <li>로그인</li>
          <li>위시 리스트</li>
          <li>테스트</li>
        </StyleLoginModal>
      )}
    </StyleLoginButtonWrap>
  );
};

const StyleLoginButtonWrap = styled.div`
  position: relative;
`;

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
`;

const StyleLoginModal = styled.ul`
  position: absolute;
  right: 0;
  width: 10rem;
  border-radius: 0.25rem;
  padding: 1rem 2rem;
  background-color: #fff;
  margin-top: 1rem;
  li {
    padding: 1rem 0;
    &:not(:last-child) {
      border-bottom: 1px solid #c4c4c4;
    }
  }
`;
