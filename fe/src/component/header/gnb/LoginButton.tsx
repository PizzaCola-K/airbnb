import styled from 'styled-components';
import { FaUser, FaBars } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import WishList from './wish-list/WishList';

export const LoginButton = () => {
  const name = localStorage.getItem('name') ? localStorage.getItem('name') : '';
  const [toggle, setToggle] = useState(false);
  const [wish, setWish] = useState(false);
  const onToggleLoginModal = () => {
    setToggle(!toggle);
  };
  const onWishList = () => {
    setWish(!wish);
  };

  const onLogin = () => {
    localStorage.setItem(
      'prev',
      window.location.pathname + window.location.search
    );
  };
  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
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
          {name !== '' ? (
            <li onClick={onLogout}>로그아웃</li>
          ) : (
            <li>
              <a
                onClick={onLogin}
                href='https://github.com/login/oauth/authorize?client_id=eeab452e618124d52f83&redirect_uri=http://localhost:3000/login'
              >
                로그인
              </a>
            </li>
          )}
          <StyledWishList onClick={onWishList}>위시 리스트</StyledWishList>
          {wish && <WishList />}
          <li>예약 목록</li>
        </StyleLoginModal>
      )}
    </StyleLoginButtonWrap>
  );
};

const StyledWishList = styled.li`
  position: relative;
`;

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
  box-shadow: 1px 1px 6px #d2d2d2;
  li {
    cursor: pointer;
    padding: 1rem 0;
    &:not(:last-child) {
      border-bottom: 1px solid #c4c4c4;
    }
    a {
      color: #333;
    }
    &:hover {
      font-weight: 600;
    }
  }
`;
