import React from 'react';
import { Button } from '@exzeo/core-ui';

import ContactFooter from './ContactFooter';

const UnderwritingReviewError = () => {
  return (
    <div>
      <h1>Thank you for quoting with Typtap!</h1>
      <p>
        You have completed the requirements to obtain your Flood Quote. To
        continue to purchase your policy, please contact one of our
        representatives.
      </p>
      <ContactFooter>
        <Button
          className={Button.constants.classNames.primary}
          data-test="edit-quote"
          label="Edit Quote"
          onClick={x => x}
        />
      </ContactFooter>
    </div>
  );
};

export default UnderwritingReviewError;
