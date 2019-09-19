import { useEffect } from 'react';

const TriggerRecalc = ({
  workflowPage,
  recalcPage,
  isRecalc,
  dirty,
  setRecalc
}) => {
  useEffect(() => {
    if (workflowPage === recalcPage && isRecalc !== dirty) {
      setRecalc(dirty);
    } else if (workflowPage !== recalcPage && isRecalc) {
      setRecalc(false);
    }
    // eslint-disable-next-line
  }, [dirty]);
  return null;
};

export default TriggerRecalc;
