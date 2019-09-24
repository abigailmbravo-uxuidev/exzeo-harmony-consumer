import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  noop,
  Switch,
  ModalPortal,
  validation,
  Field,
  FormSpy,
  useField
} from '@exzeo/core-ui';
import {
  AgencyCard,
  ShareModal,
  searchAgencies,
  AgencyTypeAhead
} from '@exzeo/harmony-core';
import TypTapLogo from './TypTapLogo';

const Summary = ({ initialValues, formInstance, formValues }) => {
  const [editAgency, setEditAgency] = useState(false);
  const [shareQuote, setShareQuote] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const agentField = useField('agentCode');

  function toggleEditAgency() {
    setEditAgency(state => {
      if (state) {
        formInstance.reset();
      }
      return !state;
    });
  }

  useEffect(() => {
    async function getAgency() {
      const result = await searchAgencies({
        agencyCode: formValues.agencyCode
      });
      const agency = result[0];
      setSelectedAgency(agency);

      if (initialValues.agencyCode !== formValues.agencyCode) {
        agentField.input.onChange(Number(agency.agentOfRecord));
      }
    }

    getAgency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.agencyCode]);

  return (
    <>
      {selectedAgency && <AgencyCard agency={selectedAgency} />}

      <Switch
        label="Want to switch to an agency of your choice?"
        dataTest="test"
        styleName="switch"
        input={{
          name: '',
          value: editAgency,
          onChange: () => toggleEditAgency(),
          onFocus: noop,
          onBlur: noop
        }}
      />

      {editAgency && (
        <div className="well">
          <Field name="agencyCode" validate={validation.isRequired}>
            {({ input, meta }) => (
              <AgencyTypeAhead
                dataTest="agency-select"
                input={input}
                meta={meta}
                label="Agencies"
                styleName="agencyCode"
              />
            )}
          </Field>

          <FormSpy subscription={{ pristine: true, submitting: true }}>
            {({ pristine, submitting }) => (
              <Button
                type="button"
                className={Button.constants.classNames.primary}
                data-test="edit-agency"
                disabled={pristine || submitting}
                onClick={formInstance.submit}
              >
                Apply Change
              </Button>
            )}
          </FormSpy>
        </div>
      )}

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

      <strong>To continue, you will need the following information</strong>
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
