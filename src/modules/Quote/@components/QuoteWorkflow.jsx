import React, { useEffect, useMemo, useState } from 'react';
import { Gandalf, getConfigForJsonTransform } from '@exzeo/harmony-core';
import { SectionLoader, FormSpy } from '@exzeo/core-ui';

import { WORKFLOW_ROUTING, ROUTES } from 'constants/navigation';
import InfoBar from 'components/InfoBar';
import Subtitle from 'components/Subtitle';

import { useWorkflowTemplate } from '../hooks';
import { useQuote } from '../QuoteContext';
import TriggerRecalc from './TriggerRecalc';
import WorkflowFooter from './WorkflowFooter';
import Summary from './Summary';

const EMPTY_OBJ = {};

const CUSTOM_COMPONENTS = {
  $INFO: InfoBar,
  $SUBTITLE: Subtitle,
  $CONSUMER_SUMMARY: Summary
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
  const workflowPage = ROUTES[`${match.params.step}`].workflowPage;
  const { template } = useWorkflowTemplate(quote);
  const transformConfig = useMemo(() => getConfigForJsonTransform(template), [
    template
  ]);

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

      if (!(recalc && workflowPage === ROUTES.customize.workflowPage)) {
        history.replace(WORKFLOW_ROUTING[match.params.step]);
      }
    } catch (error) {
      throw Error(error);
    }
  }

  if (!quote.quoteNumber || !template) {
    return <SectionLoader />;
  }

  return (
    <>
      {quoteLoading && <SectionLoader />}
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
        customHandlers={EMPTY_OBJ}
        renderFooter={
          <WorkflowFooter recalc={recalc} workflowPage={workflowPage} />
        }
        formListeners={
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
        }
      />
    </>
  );
};

export default QuoteWorkflow;
