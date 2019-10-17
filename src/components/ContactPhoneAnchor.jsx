import React from 'react';
import { CONTACT_PHONE } from '../constants/contactInformation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactPhoneAnchor = () => (
  <a
    className="contactPhone"
    data-test="phone"
    title="call us"
    href={`${CONTACT_PHONE.href}`}
  >
    {CONTACT_PHONE.display}
    <FontAwesomeIcon icon="phone-alt" />
  </a>
);

export default ContactPhoneAnchor;
