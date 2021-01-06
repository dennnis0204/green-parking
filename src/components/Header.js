import '../styles/header.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import SearchCity from './SearchCity';
import AddPointPortal from './AddPointPortal';
import { toogleAddPointPortal } from '../actions';

const Header = () => {
  const dispatch = useDispatch();
  const hasSavedPoint = useSelector((state) => state.user.point.hasSaved);

  const handleAddPoint = () => {
    dispatch(toogleAddPointPortal(true));
  };

  return (
    <header>
      <div className="logo">Logo</div>
      <div className="menu">Menu</div>
      <div onClick={handleAddPoint} className="add-point">
        {hasSavedPoint ? 'Edit Your Point' : 'Add Your Point'}
      </div>
      <AddPointPortal />
      <div className="search">
        <SearchCity />
      </div>
      <Button secondary>Sign in</Button>
    </header>
  );
};

export default Header;
