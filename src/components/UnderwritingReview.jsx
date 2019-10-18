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
          <h1>Quote Under Review</h1>
          <div className="infoBar">
            <h2>
              Annual Premium:&nbsp;<strong>$275</strong>
            </h2>
            <label>
              Quote Number:&nbsp; <strong>#77742</strong>
            </label>
          </div>
          <div className="subtitle">
            <strong>Thank you for quoting with Typtap!</strong>
            <p>
              You have completed the requirements to obtain your Flood Quote. To
              continue to purchase your policy, please contact one of our
              representatives.
            </p>
          </div>
          <div className="needsUpdating">
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
        </div>
      </main>
    </div>
  );
};

export default UnderwritingReview;
