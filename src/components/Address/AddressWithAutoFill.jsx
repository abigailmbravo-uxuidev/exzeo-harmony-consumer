import React from 'react';
import AddressFormFields from './AddressFormFields';
import FieldWatchers from './FieldWatchers';

const AddressWithAutoFill = ({
  watchField,
  fieldPrefix,
  matchPrefix,
  values
}) => {
  return (
    <React.Fragment>
      <AddressFormFields fieldPrefix={fieldPrefix} />
      {watchField && (
        <FieldWatchers
          watchField={watchField}
          fieldPrefix={fieldPrefix}
          matchPrefix={matchPrefix}
          values={values}
        />
      )}
    </React.Fragment>
  );
};

export default AddressWithAutoFill;
