import React from 'react';
import UnderwritingFooter from './UnderwritingFooter';
import { Button } from '@exzeo/core-ui';

const UnderwritingReviewError = () => {
  return (
    <div>
      <h1>Thank you for quoting with Typtap!</h1>
      <p>
        You have completed the requirements to obtain your Flood Quote. To
        continue to purchase your policy, please contact one of our
        representatives.
      </p>
      <UnderwritingFooter>
        <Button
          className={Button.constants.classNames.primary}
          data-test="edit-quote"
          label="Edit Quote"
          onClick={x => x}
        />
      </UnderwritingFooter>
    </div>
  );
};

export default UnderwritingReviewError;
