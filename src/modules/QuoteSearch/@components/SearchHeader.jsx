import React from 'react';
import { SEARCH_TYPES } from 'constants/search';

const SearchHeader = ({ searchType, setSearchType }) => {
  return (
    <React.Fragment>
      <div className="title">Welcome back!</div>
      <div className={`searchType-${searchType}`}>
        Retrieve by:{' '}
        <a
          className="selectedEmail"
          data-test="search-by-email"
          onClick={() => setSearchType(SEARCH_TYPES.email)}
        >
          Email Address
        </a>{' '}
        or{' '}
        <a
          className="selectedQuoteNumber"
          data-test="search-by-quoteNumber"
          onClick={() => setSearchType(SEARCH_TYPES.quoteNumber)}
        >
          Quote Number
        </a>
      </div>
    </React.Fragment>
  );
};

export default SearchHeader;
