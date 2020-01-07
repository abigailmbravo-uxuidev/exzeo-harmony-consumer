import React, { useEffect, useMemo, useState } from 'react';
import { Prompt } from 'react-router-dom';
import {
  Gandalf,
  getConfigForJsonTransform,
  TriggerRecalc,
  PersonalPropertyCoverageWatcher
} from '@exzeo/core-ui/src/@Harmony';
import { SectionLoader, FormSpy } from '@exzeo/core-ui';

import { WORKFLOW_ROUTING, ROUTES } from 'constants/navigation';
import InfoBar from 'components/InfoBar';
import Subtitle from 'components/Subtitle';

import { useWorkflowTemplate } from '../hooks';
import { useQuote } from '../../../context/QuoteContext';
import AdditionalInterests from './AdditionalInterests';
import AdditionalInterestsDetails from './AdditionalInterestsDetails';
import Address from './Address';
import AgencyDetails from './AgencyDetails';
import Billing from './Billing';
import EditAgency from './EditAgency';
import EffectiveDatePicker from './EffectiveDate';
import PolicyHolder from './PolicyHolder';
import PolicyholderDetails from './PolicyholderDetails';
import PropertyDetails from './PropertyDetails';
import QuoteDetails from './QuoteDetails';
import QuoteUpdateError from './QuoteUpdateError';
import Share from './Share';
import ThankYou from './WorkflowComplete';
import UnderwritingExceptionHandler from './UnderwritingExceptionHandler';
import WorkflowFooter from './WorkflowFooter';

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

const QuoteWorkflow = ({ history, match, cspMatch }) => {
  const [recalc, setRecalc] = useState(false);
  const workflowPage = ROUTES[`${match.params.step}`].workflowPage;
  const {
    loading: quoteLoading,
    error: quoteUpdateError,
    quote,
    setQuote,
    refreshQuote,
    updateQuote
  } = useQuote();
  const { template } = useWorkflowTemplate(quote);
  const transformConfig = useMemo(() => getConfigForJsonTransform(template), [
    template
  ]);

  useEffect(() => {
    if (!quote.quoteNumber) refreshQuote(match.params.quoteNumber);

    // reset quoteState when we leave QuoteWorkflow
    return () => setQuote();
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

      history.replace(WORKFLOW_ROUTING[match.params.step]);
    } catch (error) {
      throw error;
    }
  }

  if (!quote.quoteNumber || !template) {
    return <SectionLoader />;
  }

  if (quoteUpdateError) {
    return <QuoteUpdateError error={quoteUpdateError} />;
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
        useRefToScroll={false}
        renderFooter={
          <WorkflowFooter
            cspMatch={cspMatch}
            history={history}
            recalc={recalc}
            workflowPage={workflowPage}
          />
        }
        formListeners={
          <FormSpy subscription={{ dirty: true }}>
            {({ dirty }) => (
              <React.Fragment>
                <TriggerRecalc
                  dirty={dirty}
                  isRecalc={recalc}
                  setRecalc={setRecalc}
                  workflowPage={workflowPage}
                  recalcPage={ROUTES.customize.workflowPage}
                />
                <Prompt
                  when={true}
                  message={(location, action) => {
                    if (
                      action === 'POP' ||
                      (dirty &&
                        workflowPage !== ROUTES.summary.workflowPage &&
                        workflowPage !== ROUTES.complete.workflowPage)
                    ) {
                      return 'Are you sure you want to leave? You will lose all unsaved changes and be taken away from this quote.';
                    }
                    return true;
                  }}
                />
              </React.Fragment>
            )}
          </FormSpy>
        }
      />
    </React.Fragment>
  );
};

export default QuoteWorkflow;
