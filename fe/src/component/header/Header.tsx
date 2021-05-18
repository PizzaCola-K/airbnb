import styled from 'styled-components';
import { LoginButton } from './gnb/LoginButton';
import { Logo } from './gnb/Logo';
import { Navigation } from './gnb/Navigation';
import { SearchBar } from './search-bar/SearchBar';

export const Header = () => {
  return (
    <StyleHeader>
      <div className='global-navigation-bar'>
        <Logo />
        <Navigation />
        <LoginButton />
      </div>
      <SearchBar />
    </StyleHeader>
  );
};

const StyleHeader = styled.header`
  position: fixed;
  width: 100vw;
  padding: 1.25rem 5rem 1.25rem;
  .global-navigation-bar {
    display: flex;
    justify-content: space-between;
  }
`;
