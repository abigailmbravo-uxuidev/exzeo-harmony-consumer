import React from 'react';
import UnderwritingFooter from './UnderwritingFooter';
import TypTapLink from 'components/TypTapLink';

const UnderwritingExceptionFatal = () => {
  return (
    <div>
      <h1>We're So Sorry!</h1>
      <p>
        Property does not qualify. We apologize, we are unable to provide an
        automated Flood Quote for your property at this time. Please contact one
        of our representatives so they may further assist you.
      </p>
      <UnderwritingFooter>
        <TypTapLink />
      </UnderwritingFooter>
    </div>
  );
};

export default UnderwritingExceptionFatal;
