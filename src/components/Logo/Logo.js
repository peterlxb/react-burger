import React from 'react';
import "./Logo.css";
import Logo from './burger-logo.png';

const logo = (props) => (
  <div className="Logo" style={{height: props.height}}>
    <img src={Logo} alt="Myburger"/>
  </div>
);

export default logo;
