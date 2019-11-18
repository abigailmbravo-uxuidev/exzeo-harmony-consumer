import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, ModalPortal } from '@exzeo/core-ui';
import { useAgentInfo } from '@exzeo/core-ui/src/@Harmony';
import { useQuote } from '../QuoteContext';
import { WORKFLOW_ROUTING, ROUTES } from 'constants/navigation';
import { Link } from 'react-router-dom';

const companyName = 'TypTap';
const productDescription = 'Flood';

const SummaryFooter = ({ formInstance, values, history }) => {
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
            <div className="card-block">
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
                  pathname: '/thankYou',
                  state: { quoteNumber: values.quoteNumber }
                }}
                className={Button.constants.classNames.secondary}
                data-test="save-and-quit"
              >
                Save & Continue Later
              </Link>
              <Button
                type="button"
                data-test="submit"
                className={Button.constants.classNames.primary}
                onKeyPress={e => e.charCode === 13 && handleSendApplication()}
                onClick={() => handleSendApplication()}
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
