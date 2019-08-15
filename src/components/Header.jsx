import React from 'react';
import logo from '../img/TypTap.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  return (
    <header>
      <div role="banner">
        <a id="logo" className="logo" href="/" data-test="logo">
          <img src={logo} alt="TypTap Insurance" />
        </a>
        <div role="contentinfo">
          <a
            className="contactPhone"
            id="phone"
            title="call us"
            href="tel:{/*PHONE NUMBER*/}"
          >
            813-956-3522 <FontAwesomeIcon icon="phone-alt" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
