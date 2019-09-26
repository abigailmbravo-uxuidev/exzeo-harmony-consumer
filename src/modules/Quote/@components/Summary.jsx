import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ModalPortal } from '@exzeo/core-ui';
import { ShareModal } from '@exzeo/harmony-core';

import TypTapLogo from './TypTapLogo';

const Summary = ({ initialValues, formInstance }) => {
  const [shareQuote, setShareQuote] = useState(false);

  return (
    <>
      <section className="well">
        <Button
          data-test="share"
          className={Button.constants.classNames.icon}
          onClick={() => setShareQuote(true)}
        >
          Send Email
        </Button>
      </section>

      <strong>To continue, you will need the following information:</strong>
      <br />
      <ul>
        <li>Mortgage information</li>
        <li>Name and Email address of additional owners</li>
        <li>
          Name and address of any other additional insured to add to your policy
        </li>
      </ul>

      {shareQuote && (
        <ModalPortal>
          <ShareModal
            summaryType="agency"
            parentFormInstance={formInstance}
            closeModal={() => setShareQuote(false)}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default Summary;
