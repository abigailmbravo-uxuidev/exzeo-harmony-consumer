import React, { useState } from 'react';
import SummaryGroup from './SummaryGroup';
import { noop } from '@exzeo/core-ui/src';

const PropertyDetails = ({ renderChildren }) => {
  const [confirmProperty, setConfirmProperty] = useState(false);

  return (
    <React.Fragment>
      <SummaryGroup
        header="Property Details"
        detailClass="property-details"
        switchName="confirmProperty"
        switchValue={confirmProperty}
        switchOnChange={value => setConfirmProperty(value)}
        handleEditClick={noop}
      >
        {renderChildren && renderChildren()}
      </SummaryGroup>
    </React.Fragment>
  );
};

export default PropertyDetails;
