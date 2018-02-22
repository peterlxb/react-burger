import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className="NavigationItems">
    <NavigationItem link="/" active>Burger Build</NavigationItem>
    <NavigationItem link="/">Check Out</NavigationItem>
  </ul>
);

export default navigationItems;
