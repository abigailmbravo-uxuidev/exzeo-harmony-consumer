import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../img/TypTap.svg';
import ContactPhoneAnchor from './ContactPhoneAnchor';

const Header = ({ match }) => {
  return (
    <header>
      <div role="banner">
        <Link id="logo" className="logo" to={`${match.url}`} data-test="logo">
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
