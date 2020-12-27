import './header.css';
import React from 'react';
import { Button } from 'semantic-ui-react';

const Header = () => {
  return (
    <header>
      <div className="logo">Logo</div>
      <div className="menu">Menu</div>
      <Button secondary>Sign in</Button>
    </header>
  );
};

export default Header;
