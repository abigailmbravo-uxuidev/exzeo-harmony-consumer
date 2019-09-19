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
        {recalc
          ? 'Recalculate'
          : workflowPage === ROUTES.save.workflowPage
          ? 'Save'
          : 'Continue'}
      </Button>
    </>
  );
};

export default WorkflowFooter;
