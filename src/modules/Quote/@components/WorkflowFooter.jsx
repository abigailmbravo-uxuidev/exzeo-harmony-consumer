import React from 'react';
import { Button, FormSpy } from '@exzeo/core-ui';
import { ROUTES } from 'constants/navigation';
import { Link } from 'react-router-dom';
import SummaryFooter from './SummaryFooter';

const WorkflowFooter = ({ recalc, workflowPage, history, match }) => {
  if (
    workflowPage === ROUTES.additionalInfo.workflowPage ||
    workflowPage === ROUTES.complete.workflowPage
  ) {
    return null;
  }

  return (
    <FormSpy subscription={{ submitting: true, values: true }}>
      {({ submitting, form, values }) => {
        if (workflowPage === ROUTES.summary.workflowPage) {
          return (
            <SummaryFooter
              match={match}
              history={history}
              submitting={submitting}
              formInstance={form}
              values={values}
            />
          );
        }

        if (workflowPage === ROUTES.share.workflowPage) {
          return (
            <React.Fragment>
              <Link
                key="secondary"
                to={{
                  pathname: `${match.params.state}/${match.params.product}/thankYou`,
                  state: { quoteNumber: values.quoteNumber }
                }}
                className={Button.constants.classNames.secondary}
                data-test="save-and-quit"
              >
                Save & Continue Later
              </Link>
              <Link
                to="additionalInfo"
                className={Button.constants.classNames.primary}
                data-test="continue"
              >
                Continue to Purchase
              </Link>
            </React.Fragment>
          );
        }

        return (
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
        );
      }}
    </FormSpy>
  );
};

export default WorkflowFooter;
