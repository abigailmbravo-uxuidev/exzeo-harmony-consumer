import { useState, useEffect } from 'react';

import TTICFLAF3 from 'csp-templates/ttic-fl-af3-quote';
import HCPCNJAF3 from 'csp-templates/hcpc-nj-af3-quote';
import HCPCSCAF3 from 'csp-templates/hcpc-sc-af3-quote';

const TEMPLATES = {
  'TTIC:FL:AF3': TTICFLAF3,
  'HCPC:NJ:AF3': HCPCNJAF3,
  'HCPC:SC:AF3': HCPCSCAF3
};

export function useWorkflowTemplate({ companyCode, state, product }) {
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    if (companyCode && state && product) {
      const templateKey = `${companyCode}:${state}:${product}`;
      setTemplate(TEMPLATES[templateKey]);
    }
  }, [companyCode, state, product]);

  return {
    template
  };
}
