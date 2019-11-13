import React from 'react';
import classNames from 'classnames';

import UnderwritingFooter from './ContactFooter';
import TypTapLink from './TypTapLink';

const Error = ({ type }) => {
  return (
    <div className={classNames('appError', type)}>
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
  );
};

export default Error;
