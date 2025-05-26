import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

function PageTransition({ children }) {
  const location = useLocation();
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (pageRef.current) {
      pageRef.current.classList.add('page-enter');
      setTimeout(() => {
        pageRef.current?.classList.remove('page-enter');
      }, 500);
    }
  }, [location.pathname]);

  return (
    <div ref={pageRef} className="page-transition">
      {children}
    </div>
  );
}

export default PageTransition;