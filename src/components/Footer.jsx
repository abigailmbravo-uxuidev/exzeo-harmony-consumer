import React from 'react';
import { Link } from 'react-router-dom';

const QuoteSearchFooter = () => {
  return (
    <footer className="navFooter">
      <hr />
      <label>Need to start over? Or retrieve another quote?</label>
      <div>
        <span>
          <Link to="/searchAddress">New Quote</Link>
        </span>
        &nbsp;|&nbsp;
        <span>
          <Link to="/retrieveQuote">Retrieve Quote</Link>
        </span>
      </div>
    </footer>
  );
};

export default QuoteSearchFooter;
