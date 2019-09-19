import React, { useEffect, useMemo, useState } from 'react';
import { Gandalf, getConfigForJsonTransform } from '@exzeo/harmony-core';
import { Button, SectionLoader, FormSpy } from '@exzeo/core-ui';

import { WORKFLOW_ROUTING, ROUTES } from 'constants/navigation';
import InfoBar from 'components/InfoBar';
import Subtitle from 'components/Subtitle';

import { useWorkflowTemplate } from './hooks';
import { useQuote } from './QuoteContext';
import TriggerRecalc from './TriggerRecalc';
import WorkflowFooter from 'modules/Quote/WorkflowFooter';

// Thin memoized wrapper around FormSpys to keep them from needlessly re-rendering.
const MemoizedFormListeners = React.memo(({ children }) => (
  <React.Fragment>{children}</React.Fragment>
));

const EMPTY_OBJ = {};

const CUSTOM_COMPONENTS = {
  $INFO: InfoBar,
  $SUBTITLE: Subtitle
};

const QuoteWorkflow = ({ history, location, match }) => {
  const [recalc, setRecalc] = useState(false);
  const {
    loading: quoteLoading,
    quote,
    setQuote,
    retrieveQuote,
    updateQuote
  } = useQuote();
  const { template } = useWorkflowTemplate(quote);
  const transformConfig = useMemo(() => getConfigForJsonTransform(template), [
    template
  ]);
  const workflowPage = ROUTES[`${match.params.step}`].workflowPage;

  // TODO really only necessary for development (auto-refreshing)
  useEffect(() => {
    (async function() {
      if (!quote.quoteNumber) await retrieveQuote(match.params.quoteNumber);
    })();

    // unset the quote if we leave QuoteWorkflow
    return () => setQuote({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleGandalfSubmit(data, options) {
    try {
      await updateQuote(data, { workflowPage });

      if (!recalc) {
        history.replace(WORKFLOW_ROUTING[match.params.step]);
      }
    } catch (error) {
      throw Error(error);
    }
  }

  if (quoteLoading || !template) {
    return <SectionLoader />;
  }

  return (
    <>
      <Gandalf
        formId="harmony-quote"
        formClassName="workflow"
        currentPage={workflowPage}
        handleSubmit={handleGandalfSubmit}
        initialValues={quote}
        customComponents={CUSTOM_COMPONENTS}
        template={template}
        transformConfig={transformConfig}
        options={EMPTY_OBJ}
        renderFooter={({ pristine, submitting }) => (
          <WorkflowFooter
            submitting={submitting}
            recalc={recalc}
            workflowPage={workflowPage}
          />
        )}
        formListeners={() => (
          <MemoizedFormListeners>
            <FormSpy subscription={{ dirty: true }}>
              {({ dirty }) => (
                <TriggerRecalc
                  dirty={dirty}
                  isRecalc={recalc}
                  setRecalc={setRecalc}
                  workflowPage={workflowPage}
                  recalcPage={ROUTES.customize.workflowPage}
                />
              )}
            </FormSpy>
          </MemoizedFormListeners>
        )}
      />
    </>
  );
};

export default QuoteWorkflow;
