import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { LoginButton } from './gnb/LoginButton';
import { Logo } from './gnb/Logo';
import { Navigation } from './gnb/Navigation';
import { SearchBar } from './search-bar/SearchBar';

interface isProps {
  active: boolean;
}

export const Header = () => {
  const [active, setActive] = useState(false);

  const onIntersect: any = async ([entry]: any, observer: any) => {
    console.log('entry', entry);
    if (entry.isIntersecting) {
      // observer.unobserve(entry.target);
      // observer.observe(entry.target);
    }
  };

  const target: any = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    observer.observe(target.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <StyleHeader active={active} ref={target}>
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
  background-color: ${(props: isProps) =>
    props.active ? '#fff' : 'transparent'};
  .global-navigation-bar {
    display: flex;
    justify-content: space-between;
  }
`;
