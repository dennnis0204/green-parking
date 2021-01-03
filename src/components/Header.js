import '../styles/header.css';
import React from 'react';
import { Button } from 'semantic-ui-react';
import SearchCity from './SearchCity';

const Header = () => {
  return (
    <header>
      <div className="logo">Logo</div>
      <div className="menu">Menu</div>
      <div className="search">
        <SearchCity />
      </div>
      <Button secondary>Sign in</Button>
    </header>
  );
};

export default Header;
