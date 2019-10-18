import React from 'react';

import ContactPhoneAnchor from './ContactPhoneAnchor';
import ContactEmailAnchor from './ContactEmailAnchor';

const ContactFooter = ({ children }) => {
  return (
    <div>
      <ContactPhoneAnchor />
      <ContactEmailAnchor />
      {children}
    </div>
  );
};

export default ContactFooter;
