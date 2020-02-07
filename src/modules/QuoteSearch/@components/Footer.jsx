import React from 'react';
import { Button } from '@exzeo/core-ui';

const Footer = ({ submitting, pristine }) => {
  return (
    <div className="form-footer">
      <Button
        className={Button.constants.classNames.primary}
        type="submit"
        data-test="submit"
        disabled={submitting || pristine}
      >
        Retrieve Quote
      </Button>
    </div>
  );
};

export default Footer;
