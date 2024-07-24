import React from 'react';
import NavigationBar from './navigation';

export const Layout = ({ children }) => {
  return (
    <div className="">
      <header className="header mb-2">
        <NavigationBar />
      </header>
      <main className="main m-6">{children}</main>
    </div>
  );
};
