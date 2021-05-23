import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Header } from './component/header/Header';
import { List } from './component/list/List';
import { Main } from './component/main/Main';

function App() {
  const [active, setActive] = useState(false);

  const target = useRef<HTMLDivElement>(null);

  const onIntersect: IntersectionObserverCallback = async (
    entries,
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      console.log('entry : ' + entry.isIntersecting);
      console.log('ratio : ' + entry.intersectionRatio);
      if (entry.intersectionRatio === 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
    // e.target.classList.toggle('isSticky', e.intersectionRatio < 1)
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target?.current) {
      observer = new IntersectionObserver(onIntersect);
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <div className='App'>
      <StyleHeaderWrapper ref={target}>
        <Header active={active} />
      </StyleHeaderWrapper>
      {/* <List /> */}
      <Main />
    </div>
  );
}

const StyleHeaderWrapper = styled.div``;

export default App;
