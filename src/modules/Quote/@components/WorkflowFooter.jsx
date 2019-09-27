import React from 'react';
import { Button, FormSpy } from '@exzeo/core-ui';
import { ROUTES } from 'constants/navigation';
import { Link } from 'react-router-dom';

const WorkflowFooter = ({ recalc, workflowPage }) => {
  return (
    <FormSpy subscription={{ submitting: true }}>
      {({ submitting, form }) => (
        <>
          {workflowPage === ROUTES.share.workflowPage ? (
            <>
              <Link
                to="additionalInfo"
                className={Button.constants.classNames.primary}
              >
                Continue to Purchase
              </Link>
              <Link
                key="secondary"
                to="/thankYou"
                className={Button.constants.classNames.secondary}
              >
                Take care now, bye bye then!
              </Link>
            </>
          ) : (
            <Button
              type="button"
              data-test="submit"
              className={Button.constants.classNames.primary}
              onKeyPress={e => e.charCode === 13 && form.submit(e)}
              onClick={form.submit}
              disabled={
                submitting ||
                //  TODO temporary disabled so we don't pass this page
                workflowPage === ROUTES.additionalInfo.workflowPage
              }
            >
              {workflowPage === ROUTES.customize.workflowPage && recalc
                ? 'Recalculate'
                : workflowPage === ROUTES.save.workflowPage
                ? 'Save'
                : 'Continue'}
            </Button>
          )}
        </>
      )}
    </FormSpy>
  );
};

export default React.memo(WorkflowFooter);
