import { useState, useEffect } from 'react';

import MOCK_AF3_TEMPLATE from 'mock-data/mockAF3';

export function useWorkflowTemplate({ product }) {
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    if (product) {
      setTemplate(MOCK_AF3_TEMPLATE);
    }
  }, [product]);

  return {
    template
  };
}
