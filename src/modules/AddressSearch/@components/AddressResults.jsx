import React from 'react';

import { CONTACT_PHONE } from '../../../constants/contactInformation';

import AddressCard from './AddressCard';

const AddressResults = ({ results }) => {
  return (
    <>
      {results.map(property => (
        <AddressCard key={property.id} property={property} />
      ))}

      <p>
        If you don’t see your address in the list provided, try entering less
        address information to see if it comes up. Please note, at this time we
        are only writing single family dwellings in the state of Florida.
        <br />
        <br />
        If you still have problems, please&nbsp;
        <a href={CONTACT_PHONE.href}>call us</a>&nbsp;and one of our
        representative will be glad to help you.
      </p>
    </>
  );
};

export default AddressResults;
