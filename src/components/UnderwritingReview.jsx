import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@exzeo/core-ui';

import ContactFooter from './ContactFooter';

const UnderwritingReview = () => {
  return (
    <div className="modal">
      <div className="card UWReview">
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
    </div>
  );
};

export default UnderwritingReview;
