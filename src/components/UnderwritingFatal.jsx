import React from 'react';

import ContactFooter from './ContactFooter';
import TypTapLink from './TypTapLink';

const UnderwritingFatal = () => {
  return (
    <div className="UWFatal">
      <div className="title">We're So Sorry!</div>
      <p>
        Property does not qualify. We apologize, we are unable to provide an
        automated Flood Quote for your property at this time. Please contact one
        of our representatives so they may further assist you.
      </p>
      <div className="contactFooter">
        <ContactFooter>
          <TypTapLink />
        </ContactFooter>
      </div>
    </div>
  );
};

export default UnderwritingFatal;
