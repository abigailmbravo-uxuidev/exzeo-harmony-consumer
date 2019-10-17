import React from 'react';
import { CONTACT_EMAIL } from '../constants/contactInformation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactEmailAnchor = () => {
  return (
    <a
      className="contactEmail"
      data-test="email"
      title="call us"
      href={`${CONTACT_EMAIL.href}`}
    >
      {CONTACT_EMAIL.display}
      <FontAwesomeIcon icon="envelope" />
    </a>
  );
};

export default ContactEmailAnchor;
