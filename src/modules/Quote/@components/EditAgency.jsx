import React, { useEffect } from 'react';
import { Button, Field, useForm, validation } from '@exzeo/core-ui';
import { searchAgencies, AgencyTypeAhead } from '@exzeo/harmony-core';

const EditAgency = ({ initialValues, setSelectedAgency }) => {
  const formInstance = useForm();

  return (
    <div className="well">
      <Field name="agencyCode" validate={validation.isRequired}>
        {({ input, meta }) => (
          <AgencyTypeAhead
            input={input}
            meta={meta}
            label="Agencies"
            styleName="agencyCode"
          />
        )}
      </Field>

      <Button
        type="button"
        className={Button.constants.classNames.primary}
        data-test="edit-agency"
        disabled={!selectedAgency}
        onClick={formInstance.handleSubmit}
      >
        Apply Change
      </Button>
    </div>
  );
};

export default EditAgency;
