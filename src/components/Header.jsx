import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CONTACT_PHONE } from '../constants/contactInformation';

import logo from '../img/TypTap.svg';

const Header = () => {
  return (
    <header>
      <div role="banner">
        <Link id="logo" className="logo" to="/" data-test="logo">
          <img src={logo} alt="TypTap Insurance" />
        </Link>
        <div role="contentinfo">
          <a
            className="contactPhone"
            id="phone"
            title="call us"
            href={`${CONTACT_PHONE.href}`}
          >
            &nbsp;{CONTACT_PHONE.display}&nbsp;
            <FontAwesomeIcon icon="phone-alt" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
