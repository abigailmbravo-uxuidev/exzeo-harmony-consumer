// import { useState } from 'react';
// import { retrieveQuote } from '@exzeo/harmony-core';
//
// import { VALID_QUOTE_STATES } from './@components/QuoteSearch';
//
// const initialState = {
//   hasSearched: false,
//   result: null,
//   noResults: false
// };
//
// export function useQuoteSearch(formInstance) {
//   const [searchState, setSearchState] = useState(initialState);
//   const [loading, setLoading] = useState(false);
//
//   function resetSearch(form) {
//     form.reset();
//     setSearchState(initialState);
//   }
//
//   async function handleSearchSubmit({ lastName, zipCode, quoteNumber, email }) {
//     try {
//       if (searchState.hasSearched) {
//         setSearchState(initialState);
//       }
//
//       const params = {
//         quoteNumber,
//         email
//       };
//
//       setLoading(true);
//       // TODO for now only searching by quoteNumber, expecting one quote to return, but we will be adding the ability to search by email, which could result in multiple quotes...
//       const result = await retrieveQuote(params);
//       const quoteFound = result && result.quoteNumber;
//
//       setSearchState({
//         hasSearched: true,
//         result: result,
//         noResults: !quoteFound,
//         // TODO this is confusing logic, but will ultimately not be needed here once we accept 'email' as valid search criteria and can then potentially return multiple quotes
//         invalidQuoteState:
//           quoteFound && !VALID_QUOTE_STATES.includes(result.quoteState)
//       });
//     } catch (error) {
//       console.error('Error searching: ', error);
//     } finally {
//       setLoading(false);
//     }
//   }
//
//   return {
//     searchState,
//
//     loading,
//     resetSearch,
//     handleSearchSubmit
//   }
// }
