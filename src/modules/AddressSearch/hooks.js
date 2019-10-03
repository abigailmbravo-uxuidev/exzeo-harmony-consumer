import { useState } from 'react';
import { searchData } from '@exzeo/harmony-core';

const initialState = {
  hasSearched: false,
  results: [],
  noResults: false
};

export function useAddressSearch() {
  const [searchState, setSearchState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  async function handleSearchSubmit(values) {
    searchState.hasSearched && setSearchState(initialState);
    try {
      setLoading(true);
      const results = await searchData.searchAddress(values.address);
      setSearchState({
        hasSearched: true,
        results: results.IndexResult,
        noResults: !results.TotalCount
      });
    } catch (error) {
      console.error('Error searching: ', error);
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
