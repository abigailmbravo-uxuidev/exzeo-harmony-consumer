import React from 'react';
import { Button, FormSpy } from '@exzeo/core-ui';
import { ROUTES } from 'constants/navigation';
import { Link } from 'react-router-dom';
import SummaryFooter from './SummaryFooter';

const WorkflowFooter = ({ recalc, workflowPage }) => {
  if (workflowPage === ROUTES.additionalInfo.workflowPage) {
    return null;
  }

  if (workflowPage === ROUTES.summary.workflowPage) {
    return (
      <FormSpy subscription={{ submitting: true }}>
        {({ submitting, form }) => <SummaryFooter />}
      </FormSpy>
    );
  }

  return (
    <FormSpy subscription={{ submitting: true }}>
      {({ submitting, form }) => (
        <React.Fragment>
          {workflowPage === ROUTES.share.workflowPage ? (
            <React.Fragment>
              <Link
                key="secondary"
                to="/thankYou"
                className={Button.constants.classNames.secondary}
              >
                Save & Continue Later
              </Link>
              <Link
                to="additionalInfo"
                className={Button.constants.classNames.primary}
              >
                Continue to Purchase
              </Link>
            </React.Fragment>
          ) : (
            <Button
              type="button"
              data-test="submit"
              className={Button.constants.classNames.primary}
              onKeyPress={e => e.charCode === 13 && form.submit(e)}
              onClick={form.submit}
              disabled={submitting}
            >
              {workflowPage === ROUTES.customize.workflowPage && recalc
                ? 'Recalculate'
                : workflowPage === ROUTES.save.workflowPage
                ? 'Save'
                : 'Continue'}
            </Button>
          )}
        </React.Fragment>
      )}
    </FormSpy>
  );
};

export default React.memo(WorkflowFooter);
