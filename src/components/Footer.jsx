import React from 'react';
import { Link } from 'react-router-dom';

const QuoteSearchFooter = ({ match }) => {
  return (
    <footer className="navFooter">
      <hr />
      <label htmlFor="startOverRetrieve">
        Need to start over? Or retrieve a quote?
      </label>
      <div id="startOverRetrieve">
        <span>
          <Link
            to={`/${match.params.state}/${match.params.product}/searchAddress`}
          >
            New Quote
          </Link>
        </span>
        &nbsp;|&nbsp;
        <span>
          <Link
            to={`/${match.params.state}/${match.params.product}/retrieveQuote`}
          >
            Retrieve Quote
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default QuoteSearchFooter;
