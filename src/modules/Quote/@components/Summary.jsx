import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, noop, Switch, ModalPortal } from '@exzeo/core-ui';
import { AgencyCard, ShareModal } from '@exzeo/harmony-core';
import TypTapLogo from './TypTapLogo';

const Summary = ({ initialValues, formInstance }) => {
  const [editAgency, setEditAgency] = useState(false);
  const [shareQuote, setShareQuote] = useState(false);

  return (
    <div>
      <AgencyCard />
      <section>
        <Switch
          label="Want to switch to an agency of your choice?"
          dataTest="test"
          styleName="switch"
          input={{
            name: '',
            value: editAgency,
            onChange: () => setEditAgency(state => !state),
            onFocus: noop,
            onBlur: noop
          }}
        />
      </section>

      <section className="iconContainer">
        <Link className={Button.constants.classNames.icon} to="underwriting">
          <FontAwesomeIcon icon="edit" />
          <label>Edit Quote</label>
        </Link>

        <Button
          data-test="share"
          className={Button.constants.classNames.icon}
          onClick={() => setShareQuote(true)}
        >
          <FontAwesomeIcon icon="paper-plane" />
          <label>Email Quote</label>
        </Button>

        <a
          data-test="home"
          className={Button.constants.classNames.icon}
          href="https://www.typtap.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TypTapLogo />
          <label>www.TypTap.com</label>
        </a>
      </section>

      <section>
        <strong>To continue, you will need the following information</strong>
        <br />
        <ul>
          <li>Mortgage information</li>
          <li>Name and Email address of additional owners</li>
          <li>
            Name and address of any other additional insured to add to your
            policy
          </li>
        </ul>
      </section>

      {shareQuote && (
        <ModalPortal>
          <ShareModal
            summaryType="agency"
            parentFormInstance={formInstance}
            closeModal={() => setShareQuote(false)}
          />
        </ModalPortal>
      )}
    </div>
  );
};

export default Summary;
