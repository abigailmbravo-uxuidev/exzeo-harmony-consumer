import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@exzeo/core-ui';

const AddressSearchFooter = () => {
  return (
    <>
      <div className="form-footer">
        <Button
          className={Button.constants.classNames.primary}
          type="submit"
          data-test="submit"
        >
          Search Address
        </Button>
      </div>
      <hr />
      <label>Already received a quote? No problem!</label>
      <p>Your quote will be saved up to 30 days.</p>
      <Link to="/retrieveQuote" className="">
        Retrieve Quote
      </Link>
    </>
  );
};

export default AddressSearchFooter;
