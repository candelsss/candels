'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import './page-transition.css';

const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isGoingHome, setIsGoingHome] = useState(false);
  const [transitionMode, setTransitionMode] = useState('forward');
  const [prevChildren, setPrevChildren] = useState(null);
  const [currentChildren, setCurrentChildren] = useState(children);
  const [currentPathname, setCurrentPathname] = useState(pathname);
  const transitionTimerRef = useRef(null);

  useLayoutEffect(() => {
    if (!children || pathname === currentPathname) return;

    const goingToHome = pathname === '/' || pathname === '/home';
    setIsGoingHome(goingToHome);

    const navMode = sessionStorage.getItem('page-transition-mode');
    if (navMode) sessionStorage.removeItem('page-transition-mode');
    setTransitionMode(navMode === 'back' ? 'back' : 'forward');

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    setPrevChildren(currentChildren);
    setIsTransitioning(true);

    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setPrevChildren(null);
      setCurrentChildren(children);
      setCurrentPathname(pathname);
      transitionTimerRef.current = null;
    }, 750);
  }, [pathname, children, currentChildren, currentPathname]);

  useEffect(() => {
    if (!currentChildren && children) setCurrentChildren(children);
  }, [currentChildren, children]);

  return (
    <div className="page-transition-wrapper">
      {isTransitioning && prevChildren ? (
        <>
          <div
            className={`page-transition-layer layer-prev transitioning ${transitionMode === 'back' ? 'mode-back' : 'mode-forward'} ${isGoingHome ? 'going-home' : 'going-to-page'}`}
          >
            {prevChildren}
          </div>
          <div
            className={`page-transition-layer layer-next transitioning ${transitionMode === 'back' ? 'mode-back' : 'mode-forward'} ${isGoingHome ? 'going-home' : 'going-to-page'}`}
          >
            {children}
          </div>
        </>
      ) : (
        <div className="page-transition-layer layer-current">{currentChildren}</div>
      )}
    </div>
  );
};

export default PageTransition;
