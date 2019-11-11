import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CONTACT_EMAIL } from 'constants/contactInformation';

const ContactEmailAnchor = () => {
  return (
    <a
      className="contactEmail"
      data-test="email"
      title="email us"
      href={`${CONTACT_EMAIL.href}`}
    >
      {CONTACT_EMAIL.display}&nbsp;
      <FontAwesomeIcon icon="envelope" />
    </a>
  );
};

export default ContactEmailAnchor;
