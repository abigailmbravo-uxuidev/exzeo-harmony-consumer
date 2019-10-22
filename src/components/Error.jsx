import React from 'react';

import UnderwritingFooter from './ContactFooter';
import TypTapLink from './TypTapLink';

const Error = () => {
  return (
    <div className="appError">
      <h1>Uh Oh!</h1>
      <p>
        We are experiencing technical difficulties. Please try again later, or
        contact one of our representatives so they may further assist you.
      </p>
      <UnderwritingFooter>
        <TypTapLink />
      </UnderwritingFooter>
    </div>
  );
};

export default Error;
