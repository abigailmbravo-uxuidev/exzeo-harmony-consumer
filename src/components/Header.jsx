import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../img/TypTap.svg';
import ContactPhoneAnchor from './ContactPhoneAnchor';

const Header = () => {
  return (
    <header>
      <div role="banner">
        <Link id="logo" className="logo" to="/" data-test="logo">
          <img src={logo} alt="TypTap Insurance" />
        </Link>
        <div role="contentinfo">
          <ContactPhoneAnchor />
        </div>
      </div>
    </header>
  );
};

export default Header;
