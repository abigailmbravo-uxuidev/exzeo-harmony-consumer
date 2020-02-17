import { useState } from 'react';
import { searchData } from '@exzeo/core-ui/src/@Harmony';

const INITIAL_STATE = {
  hasSearched: false,
  results: [],
  noResults: false
};

export function useAddressSearch() {
  const [searchState, setSearchState] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  async function handleSearchSubmit(values) {
    searchState.hasSearched && setSearchState(INITIAL_STATE);
    try {
      setLoading(true);
      const results = await searchData.searchAddress(values);
      setSearchState({
        hasSearched: true,
        results: results.IndexResult,
        noResults: !results.TotalCount
      });
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error searching: ', error);
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    searchState,
    loading,
    handleSearchSubmit
  };
}
