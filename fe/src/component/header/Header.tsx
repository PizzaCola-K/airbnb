import styled from 'styled-components';
import { LoginButton } from './gnb/LoginButton';
import { Logo } from './gnb/Logo';
import { Navigation } from './gnb/Navigation';
import { SearchBar } from './search-bar/SearchBar';
import { PopUpProvider } from '../ui-util/PopUpContext';
import { PersonnelProvider } from '../ui-util/PersonnelContext'
import { CalendarContext } from '../ui-util/CalendarContext'
import { PriceProvider } from '../ui-util/PriceContext'

interface isProps {
  active: boolean;
}

export const Header: React.FunctionComponent<isProps> = ({ active }) => {
  return (
    <StyleHeader active={active}>
      <div className='global-navigation-bar'>
        <Logo />
        <Navigation />
        <LoginButton />
      </div>
      <PopUpProvider>
      <CalendarContext>
        <PersonnelProvider>
          <PriceProvider>
            <SearchBar />
          </PriceProvider>
        </PersonnelProvider>
        </CalendarContext>
      </PopUpProvider>
    </StyleHeader>
  );
};

const StyleHeader = styled.header`
  position: fixed;
  width: 100vw;
  padding: 1.25rem 5rem 1.25rem;
  top: 0;
  transition: bottom 0.5s linear;
  background-color: ${(props: isProps) =>
    props.active ? '#fff' : 'transparent'};
  .global-navigation-bar {
    display: flex;
    justify-content: space-between;
  }
`;
