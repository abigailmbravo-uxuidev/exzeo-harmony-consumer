import React from 'react';

import ContactFooter from './ContactFooter';
import TypTapLink from './TypTapLink';

const UnderwritingFatal = () => {
  return (
    <div role="region">
      <nav role="navigation" className="navWrapper navSlideIn"></nav>
      <main role="main">
        <div className="view-grid">
          <div className="UWFatal">
            <div className="title">We're So Sorry!</div>
            <p>
              Property does not qualify. We apologize, we are unable to provide
              an automated Flood Quote for your property at this time. Please
              contact one of our representatives so they may further assist you.
            </p>
            <ContactFooter>
              <TypTapLink />
            </ContactFooter>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UnderwritingFatal;
