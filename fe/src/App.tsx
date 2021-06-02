import { useEffect, useRef, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './component/header/Header';
import { List } from './component/list/List';
import { Main } from './component/main/Main';
// import { RangeSlider } from './component/main/RangeSlider';
import { Login } from './component/login/Login';

function App() {
  const [active, setActive] = useState(false);

  const target = useRef<HTMLDivElement>(null);

  const onIntersect: IntersectionObserverCallback = async (
    entries,
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
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
      <Switch>
        <Route exact path={['/', '/list']}>
          <StyleHeaderWrapper ref={target}>
            <Header active={active} />
          </StyleHeaderWrapper>
          <Route path='/' component={Main} />
          {/* <Route path='/' component={RangeSlider} /> */}
          <Route path='/list' component={List} />
        </Route>
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
}

const StyleHeaderWrapper = styled.div``;

export default App;
