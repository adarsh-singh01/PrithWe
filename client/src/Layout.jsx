import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer2 from './components/Footer2';

const Layout = ({ setLoggedIn,children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/dashboard' || /^\/admin\/user\/[^\/]+$/.test(location.pathname);

  return (
    <>
      {!isAdminRoute && <Header setLoggedIn={setLoggedIn}/>}
      {children}
      {!isAdminRoute && <Footer2 />}
    </>
  );
};

export default Layout;
