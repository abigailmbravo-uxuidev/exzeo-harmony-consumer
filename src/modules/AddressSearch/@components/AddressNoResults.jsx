import React from 'react';

const AddressNoResults = () => {
  return (
    <div data-test="no-results">
      We're sorry, we're unable to retrieve the address you've entered. Please
      note: TypTap only insures single family homes. If the address you have
      enter does not meet that criteria, it will return in the results!
    </div>
  );
};

export default AddressNoResults;
