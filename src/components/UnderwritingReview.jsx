import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@exzeo/core-ui';

import ContactFooter from './ContactFooter';

const UnderwritingReview = () => {
  return (
    <div role="region">
      <nav role="navigation" className="navWrapper navSlideIn"></nav>
      <main role="main">
        <div className="UWReview">
          <h1>Thank you for quoting with Typtap!</h1>
          <p>
            You have completed the requirements to obtain your Flood Quote. To
            continue to purchase your policy, please contact one of our
            representatives.
          </p>
          <ContactFooter>
            <Link
              to="customize"
              className={Button.constants.classNames.primary}
              data-test="edit-quote"
            >
              Edit Quote
            </Link>
          </ContactFooter>
        </div>
      </main>
    </div>
  );
};

export default UnderwritingReview;
