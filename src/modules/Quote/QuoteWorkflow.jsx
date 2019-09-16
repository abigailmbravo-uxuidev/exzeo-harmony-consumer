import React, { useEffect, useMemo } from 'react';
import { Gandalf, getConfigForJsonTransform } from '@exzeo/harmony-core';
import { Button, SectionLoader } from '@exzeo/core-ui';

import { WORKFLOW_ROUTING, ROUTES } from 'constants/navigation';
import InfoBar from 'components/InfoBar';

import { useWorkflowTemplate } from './hooks';
import { useQuote } from './QuoteContext';

const EMPTY_OBJ = {};

const CUSTOM_COMPONENTS = {
  $INFO: InfoBar
};

const QuoteWorkflow = ({ history, location, match }) => {
  const {
    loading: quoteLoading,
    quote,
    retrieveQuote,
    updateQuote
  } = useQuote();
  const { template } = useWorkflowTemplate(quote);
  const transformConfig = useMemo(() => getConfigForJsonTransform(template), [
    template
  ]);
  const currentPage = ROUTES[`${match.params.step}`].workflowPage;

  // TODO really only necessary for development (auto-refreshing)
  useEffect(() => {
    (async function() {
      if (!quote.quoteNumber) await retrieveQuote(match.params.quoteNumber);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleGandalfSubmit(data, options) {
    const testing = 'testing';
    try {
      const test = 'test';
      await updateQuote(data);

      history.replace(WORKFLOW_ROUTING[match.params.step]);
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
        currentPage={currentPage}
        handleSubmit={handleGandalfSubmit}
        initialValues={quote}
        customComponents={CUSTOM_COMPONENTS}
        template={template}
        transformConfig={transformConfig}
        options={EMPTY_OBJ}
        renderFooter={({ pristine, submitting }) => (
          <Button
            type="submit"
            data-test="submit"
            className={Button.constants.classNames.primary}
            disabled={pristine || submitting}
          >
            Continue
          </Button>
        )}
      />
    </>
  );
};

export default QuoteWorkflow;
