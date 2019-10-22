import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@exzeo/core-ui';

import ContactFooter from './ContactFooter';
import InfoBar from 'components/InfoBar';

const UnderwritingReview = ({ quote }) => {
  return (
    <div className="UWReview">
      <div className="title">Quote Under Review</div>

      <InfoBar initialValues={quote} />

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
  );
};

export default UnderwritingReview;
