import React, { useState } from 'react';
import { Button, ModalPortal, format } from '@exzeo/core-ui';
import { ShareModal } from '@exzeo/core-ui/src/@Harmony';
import { useQuote } from 'modules/Quote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Share = ({ formInstance, initialValues }) => {
  const [shareQuote, setShareQuote] = useState(false);
  const { totalPremium } = initialValues.rating || {};
  const { quote } = useQuote();

  return (
    <React.Fragment>
      <div className="card shareDetails">
        <div className="cardContent">
          <h3>
            {quote.policyHolders[0].firstName}&nbsp;
            {quote.policyHolders[0].lastName}
          </h3>
          <strong>
            {initialValues.quoteNumber}&nbsp;|&nbsp;
            {format.toCurrency(totalPremium)}
          </strong>
          <div className="propertyAddress">
            {quote.property.physicalAddress.address1},&nbsp;
            {format.toCityStateZip(quote.property.physicalAddress)}
          </div>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquet
        metus quis aliquet porttitor. Pellentesque hendrerit felis in ex
        molestie, id dictum dolor imperdiet.
      </p>
      <div className="iconBtnWrapper">
        <label>Share Quote</label>
        <Button
          className={Button.constants.classNames.secondary}
          onClick={() => setShareQuote(true)}
          data-test="share"
        >
          <FontAwesomeIcon icon="paper-plane" />
        </Button>
      </div>

      {shareQuote && (
        <ModalPortal>
          <ShareModal
            summaryType="consumer"
            parentFormInstance={formInstance}
            closeModal={() => setShareQuote(false)}
            allowCancel={true}
          />
        </ModalPortal>
      )}

      <hr />

      <h5>To continue, you will need the following information:</h5>
      <ul>
        <li>Mortgage information</li>
        <li>Name and Email address of additional owners</li>
        <li>
          Name and address of any other additional insured to add to your policy
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Share;
