import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CONTACT_PHONE } from 'constants/contactInformation';

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
