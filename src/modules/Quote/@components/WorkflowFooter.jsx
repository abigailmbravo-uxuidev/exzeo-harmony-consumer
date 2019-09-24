import React from 'react';
import { Button, FormSpy } from '@exzeo/core-ui';
import { ROUTES } from 'constants/navigation';

const WorkflowFooter = ({ recalc, workflowPage }) => {
  return (
    <FormSpy subscription={{ submitting: true }}>
      {({ submitting }) => (
        <Button
          type="submit"
          data-test="submit"
          className={Button.constants.classNames.primary}
          disabled={
            submitting || workflowPage === ROUTES.additionalInfo.workflowPage
          }
        >
          {workflowPage === ROUTES.customize.workflowPage && recalc
            ? 'Recalculate'
            : workflowPage === ROUTES.save.workflowPage
            ? 'Save'
            : workflowPage === ROUTES.share.workflowPage
            ? 'Continue to Purchase'
            : 'Continue'}
        </Button>
      )}
    </FormSpy>
  );
};

export default WorkflowFooter;
