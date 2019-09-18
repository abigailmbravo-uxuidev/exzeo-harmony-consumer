import React from 'react';
import { Link } from 'react-router-dom';

const QuoteSearchFooter = () => {
  return (
    <>
      <hr />
      <label>Never quoted your address? No problem!</label>
      <p>Your address can be found with the link below.</p>
      <Link to="/searchAddress">New Quote</Link>
    </>
  );
};

export default QuoteSearchFooter;
