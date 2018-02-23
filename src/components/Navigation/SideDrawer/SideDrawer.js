import React from 'react';
import './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => {
  // ...
  return (
    <div className="SideDrawer">
      <div className="Logo">
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  )
};

export default sideDrawer;
