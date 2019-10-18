import React from 'react';

import ContactFooter from './ContactFooter';
import TypTapLink from './TypTapLink';

const UnderwritingFatal = () => {
  return (
    <div>
      <h1>We're So Sorry!</h1>
      <p>
        Property does not qualify. We apologize, we are unable to provide an
        automated Flood Quote for your property at this time. Please contact one
        of our representatives so they may further assist you.
      </p>
      <ContactFooter>
        <TypTapLink />
      </ContactFooter>
    </div>
  );
};

export default UnderwritingFatal;
