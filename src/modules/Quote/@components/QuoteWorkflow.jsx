import React, { useEffect, useMemo, useState } from 'react';
import {
  Gandalf,
  getConfigForJsonTransform,
  TriggerRecalc
} from '@exzeo/harmony-core';
import { SectionLoader, FormSpy } from '@exzeo/core-ui';

import { WORKFLOW_ROUTING, ROUTES } from 'constants/navigation';
import InfoBar from 'components/InfoBar';
import Subtitle from 'components/Subtitle';

import { useWorkflowTemplate } from '../hooks';
import { useQuote } from '../QuoteContext';
import WorkflowFooter from './WorkflowFooter';
import Share from './Share';
import PropertyDetails from './PropertyDetails';
import EditAgency from './EditAgency';
import AdditionalInterests from './AdditionalInterests';
import PolicyHolder from './PolicyHolder';
import ThankYou from './WorkflowComplete';
import Address from './Address';
import EffectiveDatePicker from './EffectiveDate';
import Billing from './Billing';

const EMPTY_OBJ = {};

const CUSTOM_COMPONENTS = {
  $ADDITIONAL_INTERESTS: AdditionalInterests,
  $ADDRESS: Address,
  $AGENCY_SELECT: EditAgency,
  $BILLING: Billing,
  $INFO: InfoBar,
  $POLICYHOLDER: PolicyHolder,
  $SUBTITLE: Subtitle,
  $SHARE: Share,
  $PROPERTY_DETAILS: PropertyDetails,
  $THANK_YOU: ThankYou,
  date: EffectiveDatePicker
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

      if (recalc && workflowPage === ROUTES.customize.workflowPage) {
        return;
      }

      history.push(WORKFLOW_ROUTING[match.params.step]);
    } catch (error) {
      throw Error(error);
    }
  }

  if (!quote.quoteNumber || !template) {
    return <SectionLoader />;
  }

  const customHandlers = {
    handleSubmit: updateQuote
  };

  return (
    <React.Fragment>
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
        customHandlers={customHandlers}
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
    </React.Fragment>
  );
};

export default QuoteWorkflow;
