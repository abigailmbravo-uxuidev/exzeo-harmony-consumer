import React from 'react';
import { Link } from 'react-router-dom';

const AddressSearchFooter = () => {
  return (
    <>
      <label>Already received a quote? No problem!</label>
      <p>Your quote will be saved up to 30 days.</p>

      <div className="form-footer">
        <Link to="/retrieveQuote" className="btn btn-secondary">
          Retrieve Quote
        </Link>
      </div>
    </>
  );
};

export default AddressSearchFooter;
