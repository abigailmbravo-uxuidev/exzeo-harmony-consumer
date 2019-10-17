import React from 'react';
import ContactPhoneAnchor from 'components/ContactPhoneAnchor';
import ContactEmailAnchor from 'components/ContactEmailAnchor';
import TypTapLink from 'components/TypTapLink';

const UnderwritingFooter = ({ children }) => {
  return (
    <div>
      <ContactPhoneAnchor />
      <ContactEmailAnchor />
      {children}
    </div>
  );
};

export default UnderwritingFooter;
