import React, { useState, useEffect } from 'react';
import { noop, Switch, validation, Field, useField } from '@exzeo/core-ui';

import {
  AgencyCard,
  searchAgencies,
  AgencyTypeAhead
} from '@exzeo/harmony-core';

const AgencySelect = ({ initialValues, formInstance, formValues }) => {
  const [editAgency, setEditAgency] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const agencyField = useField('agencyCode');
  const agentField = useField('agentCode');

  useEffect(() => {
    async function getAgency() {
      const result = await searchAgencies({
        agencyCode: formValues.editAgencyValue || initialValues.agencyCode
      });

      const agency = result[0];
      setSelectedAgency(agency);

      agencyField.input.onChange(Number(agency.agencyCode));
      agentField.input.onChange(Number(agency.agentOfRecord));
      setEditAgency(false);
    }

    getAgency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.editAgencyValue]);

  function toggleEditAgency() {
    setEditAgency(state => {
      if (state) {
        formInstance.reset();
      }
      return !state;
    });
  }

  return (
    <>
      <Switch
        label="Do you want to change the agency?"
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
          <Field name="editAgencyValue" validate={validation.isRequired}>
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
        </div>
      )}

      {selectedAgency && <AgencyCard agency={selectedAgency} />}
    </>
  );
};

export default AgencySelect;
