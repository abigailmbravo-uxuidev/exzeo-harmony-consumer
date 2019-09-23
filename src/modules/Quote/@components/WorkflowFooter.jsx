import React from 'react';
import { Button } from '@exzeo/core-ui';
import { ROUTES } from 'constants/navigation';

const WorkflowFooter = ({ submitting, recalc, workflowPage }) => {
  return (
    <>
      <Button
        type="submit"
        data-test="submit"
        className={Button.constants.classNames.primary}
        disabled={submitting}
      >
        {workflowPage === ROUTES.customize.workflowPage && recalc
          ? 'Recalculate'
          : workflowPage === ROUTES.save.workflowPage
          ? 'Save'
          : workflowPage === ROUTES.share.workflowPage
          ? 'Continue to Purchase'
          : 'Continue'}
      </Button>
    </>
  );
};

export default WorkflowFooter;
