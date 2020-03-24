import React from 'react';
import { Redirect } from 'react-router-dom';
import { SectionLoader } from '@exzeo/core-ui';

import { CONTACT_PHONE } from 'constants/contactInformation';
import { useQuote } from 'context/QuoteContext';

import AddressCard from './AddressCard';

const AddressResults = ({ results, cspMatch, csp }) => {
  const { quote, loading, createQuote } = useQuote();

  async function handleClick(address) {
    await createQuote(address, csp);
  }

  if (loading) {
    return <SectionLoader />;
  }

  if (quote.quoteNumber) {
    return (
      <Redirect
        push
        to={`${cspMatch}/quote/${quote.quoteNumber}/underwriting`}
      />
    );
  }

  return (
    <React.Fragment>
      {results.map(property => (
        <AddressCard
          key={property.id}
          property={property}
          handleClick={handleClick}
        />
      ))}
      <p>
        If you don’t see your address in the list provided, try entering less
        address information to see if it comes up. Please note, at this time we
        are only writing single family dwellings in Florida, New Jersey and
        South Carolina.
        <br />
        <br />
        If you still have problems, please&nbsp;
        <a href={CONTACT_PHONE.href}>call us</a>&nbsp;and one of our
        representative will be glad to help you.
      </p>
    </React.Fragment>
  );
};

export default AddressResults;
