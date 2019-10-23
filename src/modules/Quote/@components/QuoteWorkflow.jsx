import React, { useEffect, useMemo, useState } from 'react';
import {
  Gandalf,
  getConfigForJsonTransform,
  TriggerRecalc,
  PersonalPropertyCoverageWatcher
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
import AgencyDetails from './AgencyDetails';
import QuoteDetails from './QuoteDetails';
import PolicyholderDetails from './PolicyholderDetails';
import AdditionalInterestsDetails from './AdditionalInterestsDetails';
import UnderwritingExceptionHandler from './UnderwritingExceptionHandler';

const EMPTY_OBJ = {};

const CUSTOM_COMPONENTS = {
  date: EffectiveDatePicker,
  $ADDITIONAL_INTERESTS: AdditionalInterests,
  $ADDRESS: Address,
  $AGENCY_SELECT: EditAgency,
  $BILLING: Billing,
  $INFO: InfoBar,
  $POLICYHOLDER: PolicyHolder,
  $SUBTITLE: Subtitle,
  $SHARE: Share,
  $THANK_YOU: ThankYou,
  $PROPERTY_DETAILS: PropertyDetails,
  $AGENCY_DETAILS: AgencyDetails,
  $QUOTE_DETAILS: QuoteDetails,
  $POLICYHOLDER_DETAILS: PolicyholderDetails,
  $ADDITIONAL_INTERESTS_DETAILS: AdditionalInterestsDetails,
  $COVERAGE_WATCHER_AF3: PersonalPropertyCoverageWatcher
};

const QuoteWorkflow = ({ history, match }) => {
  const [recalc, setRecalc] = useState(false);
  const workflowPage = ROUTES[`${match.params.step}`].workflowPage;
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

  // TODO really only necessary for development (auto-refreshing)
  useEffect(() => {
    if (!quote.quoteNumber) retrieveQuote(match.params.quoteNumber);

    // unset the quote if we leave QuoteWorkflow
    return () => setQuote({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customHandlers = {
    handleSubmit: updateQuote
  };

  async function handleGandalfSubmit(data) {
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

  return (
    <React.Fragment>
      {quoteLoading && <SectionLoader />}

      <UnderwritingExceptionHandler workflowPage={workflowPage} quote={quote} />

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
          <WorkflowFooter
            history={history}
            recalc={recalc}
            workflowPage={workflowPage}
          />
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
