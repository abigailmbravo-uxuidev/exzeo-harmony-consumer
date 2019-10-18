import React from 'react';
import { TYP_TAP_URL } from '../constants/contactInformation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TypTapLink = () => (
  <a
    className="contactPhone"
    data-test="typtap-link"
    title="typtap.com"
    href={`${TYP_TAP_URL.href}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {TYP_TAP_URL.display}
    <FontAwesomeIcon icon="clone" />
  </a>
);

export default TypTapLink;
