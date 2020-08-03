import React from 'react';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ContactPhoneAnchor from './ContactPhoneAnchor';
import logo from 'img/TypTap.svg';

const UnsupporteBrowser = () => {
  return (
    <>
      <header>
        <Helmet>
          <title>TypTap</title>
        </Helmet>
        <div role="banner">
          <Link id="logo" className="logo" to="/" data-test="logo">
            <img src={logo} alt="TypTap Insurance" />
          </Link>
          <div role="contentinfo">
            <ContactPhoneAnchor />
          </div>
        </div>
      </header>
      <div role="region">
        <nav role="navigation" />
        <main role="main">
          <div className="view-grid">
            <div className="appError">
              <div className="title">Unsupported Browser</div>
              <p>
                We have detected that you are using an unsupported browser.
                TypTap recommends that you use Google Chrome or Microsoft Edge
                for best experience when quoting.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UnsupporteBrowser;
