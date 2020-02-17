import React, { useState } from 'react';
import { SEARCH_TYPES } from 'constants/search';
import SearchHeader from './SearchHeader';
import SearchByEmail from './SearchByEmail';
import SearchByQuoteNumber from './SearchByQuoteNumber';

const SEARCH_CONTAINERS = {
  [SEARCH_TYPES.email]: SearchByEmail,
  [SEARCH_TYPES.quoteNumber]: SearchByQuoteNumber
};

const RetrieveQuote = ({ history, match, cspMatch, csp }) => {
  const [searchType, setSearchType] = useState(SEARCH_TYPES.email);
  const SearchComponent = SEARCH_CONTAINERS[searchType];

  return (
    <React.Fragment>
      <SearchHeader searchType={searchType} setSearchType={setSearchType} />
      <SearchComponent
        history={history}
        match={match}
        cspMatch={cspMatch}
        csp={csp}
      />
    </React.Fragment>
  );
};

export default RetrieveQuote;
