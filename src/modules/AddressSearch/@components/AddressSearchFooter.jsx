import React from 'react';
import { Link } from 'react-router-dom';

const AddressSearchFooter = () => {
  return (
    <>
      <hr />
      <label>Already received a quote? No problem!</label>
      <p>Your quote will be saved up to 30 days.</p>
      <Link to="/retrieveQuote">Retrieve Quote</Link>
    </>
  );
};

export default AddressSearchFooter;
