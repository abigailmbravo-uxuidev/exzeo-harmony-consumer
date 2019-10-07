import React, { useState, useEffect } from 'react';
import {
  noop,
  SectionLoader,
  Switch,
  validation,
  Field,
  useField
} from '@exzeo/core-ui';

import {
  AgencyCard,
  searchAgencies,
  AgencyTypeAhead
} from '@exzeo/harmony-core';

const AgencySelect = ({ initialValues, formInstance, formValues }) => {
  const [editAgency, setEditAgency] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [loading, setLoading] = useState(false);
  const agencyField = useField('agencyCode');
  const agentField = useField('agentCode');

  useEffect(() => {
    async function getAgency() {
      setLoading(true);
      const result = await searchAgencies({
        agencyCode: formValues.editAgencyValue || initialValues.agencyCode
      });

      const agency = result[0];
      setSelectedAgency(agency);

      agencyField.input.onChange(Number(agency.agencyCode));
      agentField.input.onChange(Number(agency.agentOfRecord));

      setLoading(false);
      setEditAgency(false);
    }

    getAgency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.editAgencyValue]);

  function toggleEditAgency() {
    setEditAgency(editing => {
      if (editing) {
        agencyField.input.onChange(initialValues.agencyCode);
        agentField.input.onChange(initialValues.agentCode);
      }
      return !editing;
    });
  }

  return (
    <React.Fragment>
      <Switch
        label="I want to change my agency"
        hint="This is the Insurance Agency that will help to service your policy.  If you have an agency you would prefer to work with, you can select them here.  Otherwise TypTap can act as your agency for you."
        dataTest="edit-agency"
        styleName="switch agencySelect"
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
          <Field name="editAgencyValue" validate={validation.isRequired}>
            {({ input, meta }) => (
              <AgencyTypeAhead
                dataTest="agency-select"
                input={input}
                meta={meta}
                label="Agencies"
                styleName="type-ahead"
              />
            )}
          </Field>
        </div>
      )}

      <div className="card-container">
        {loading ? (
          <SectionLoader />
        ) : selectedAgency ? (
          <AgencyCard agency={selectedAgency} />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default AgencySelect;
