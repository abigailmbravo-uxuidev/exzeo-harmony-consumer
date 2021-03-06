import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, ModalPortal } from '@exzeo/core-ui';
import { useAgentInfo } from '@exzeo/core-ui/src/@Harmony';

import { WORKFLOW_ROUTING, ROUTES } from 'constants/navigation';
import { useQuote } from '../../../context/QuoteContext';

const companyName = 'TypTap';
const productDescription = 'Flood';

const SummaryFooter = ({ formInstance, values, history, cspMatch }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { sendApplication, quote } = useQuote();
  const { agent } = useAgentInfo(values.agentCode);

  const promptToConfirm = () => {
    const { invalid } = formInstance.getState();
    if (invalid) {
      formInstance.submit();
    } else {
      setShowConfirm(true);
    }
  };

  const handleSendApplication = async () => {
    await sendApplication(quote.quoteNumber, {});
    history.push(WORKFLOW_ROUTING[ROUTES.summary.path]);
  };

  return (
    <React.Fragment>
      <Button
        type="button"
        data-test="submit"
        className={Button.constants.classNames.primary}
        onKeyPress={e => e.charCode === 13 && promptToConfirm()}
        onClick={() => promptToConfirm()}
      >
        Continue
      </Button>

      {showConfirm && (
        <ModalPortal>
          <Modal
            size={Modal.sizes.xlarge}
            className=""
            header={
              <React.Fragment>
                <h4>Application Complete!</h4>
                <a onClick={() => setShowConfirm(false)}>
                  <FontAwesomeIcon icon="times" />
                </a>
              </React.Fragment>
            }
          >
            <div className="card-block mobileGrowShrink">
              <p>
                You have successfully completed a {companyName}{' '}
                {productDescription} Quote.
              </p>
              <p>
                With this information, we will generate the {productDescription}{' '}
                Application, and e-mail it to:
              </p>
              <ul>
                <li>{`${values.policyHolders[0].firstName} ${values.policyHolders[0].lastName} (${values.policyHolders[0].emailAddress})`}</li>

                {values.policyHolders.length > 1 && (
                  <li>{`${values.policyHolders[1].firstName} ${values.policyHolders[1].lastName} (${values.policyHolders[1].emailAddress})`}</li>
                )}
              </ul>
              <p>
                {`A copy will also be sent to your agent (${agent.emailAddress}).`}
              </p>

              <p>
                Once all electronic signatures have been received, the policy
                will automatically be bound and the policy documents will be
                emailed to you and your agent.
              </p>

              <p>
                <strong>NOTE:</strong> All signatures must be completed within
                10 days, or the application will expire. Once you send, no
                changes can be made to this quote.
              </p>
            </div>

            <div className="card-footer applicationComplete">
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
              <Button
                type="button"
                className={Button.constants.classNames.primary}
                onClick={() => handleSendApplication()}
                onKeyPress={e => e.charCode === 13 && handleSendApplication()}
                data-test="submit"
              >
                Send for Signature
              </Button>
            </div>
          </Modal>
        </ModalPortal>
      )}
    </React.Fragment>
  );
};

export default SummaryFooter;
