import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { COMPANY_CODE_MAP } from 'constants/companyStateProduct';
import logo from 'img/TypTap.svg';

import ContactPhoneAnchor from './ContactPhoneAnchor';

const Header = ({ cspMatch, match }) => {
  const { companyCode, state, product } = match.params;
  const companyDisplay = COMPANY_CODE_MAP[companyCode.toUpperCase()];
  const productDisplay = product.charAt(0).toUpperCase() + product.substring(1);
  const pageTitle = `${companyDisplay} ${state.toUpperCase()} ${productDisplay}`;

  return (
    <header>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div role="banner">
        <Link id="logo" className="logo" to={cspMatch} data-test="logo">
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
