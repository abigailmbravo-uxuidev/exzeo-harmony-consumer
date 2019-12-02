import React from 'react';
import { Button, FormSpy } from '@exzeo/core-ui';
import { ROUTES, WORKFLOW_ROUTING } from 'constants/navigation';
import { Link } from 'react-router-dom';
import SummaryFooter from './SummaryFooter';

const WorkflowFooter = ({ recalc, workflowPage, history, cspMatch }) => {
  return (
    <FormSpy subscription={{ submitting: true, values: true }}>
      {({ submitting, form, values }) => {
        switch (workflowPage) {
          case ROUTES.summary.workflowPage:
            return (
              <SummaryFooter
                cspMatch={cspMatch}
                history={history}
                submitting={submitting}
                formInstance={form}
                values={values}
              />
            );

          case ROUTES.share.workflowPage:
            return (
              <React.Fragment>
                <Link
                  to={{
                    pathname: `${cspMatch}/thankYou`,
                    state: { quoteNumber: values.quoteNumber }
                  }}
                  className={Button.constants.classNames.secondary}
                  data-test="save-and-quit"
                >
                  Save & Continue Later
                </Link>
                <Link
                  replace
                  to="additionalInfo"
                  className={Button.constants.classNames.primary}
                  data-test="submit"
                >
                  Continue to Purchase
                </Link>
              </React.Fragment>
            );

          case ROUTES.additionalInfo.workflowPage:
            return (
              <Link
                replace
                to={WORKFLOW_ROUTING[ROUTES.additionalInfo.path]}
                className={Button.constants.classNames.primary}
                data-test="submit"
              >
                Continue
              </Link>
            );
          case ROUTES.complete.workflowPage:
            return null;
          default:
            return (
              <Button
                type="button"
                className={Button.constants.classNames.primary}
                onClick={form.submit}
                onKeyPress={e => e.charCode === 13 && form.submit(e)}
                disabled={submitting}
                data-test="submit"
              >
                {workflowPage === ROUTES.customize.workflowPage && recalc
                  ? 'Recalculate'
                  : workflowPage === ROUTES.save.workflowPage
                  ? 'Save'
                  : 'Continue'}
              </Button>
            );
        }
      }}
    </FormSpy>
  );
};

export default WorkflowFooter;
