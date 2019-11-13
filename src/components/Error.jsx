import React from 'react';

import UnderwritingFooter from './ContactFooter';
import TypTapLink from './TypTapLink';

const Error = () => {
  return (
    <div role="region">
      <nav role="navigation"></nav>
      <div className="appError">
        <div className="title">Uh Oh!</div>
        <p>
          We are experiencing technical difficulties. Please try again later, or
          contact one of our representatives so they may further assist you.
        </p>
        <div className="contactFooter">
          <UnderwritingFooter>
            <TypTapLink />
          </UnderwritingFooter>
        </div>
      </div>
    </div>
  );
};

export default Error;
