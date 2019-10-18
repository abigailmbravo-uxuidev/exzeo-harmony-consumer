import React from 'react';
import SummaryGroup from './SummaryGroup';
import { noop } from '@exzeo/core-ui/src';

const PropertyDetails = ({ renderChildren }) => {
  return (
    <React.Fragment>
      <SummaryGroup
        header="Property Details"
        detailClass="property-details"
        name="confirmProperty"
        link="policyholder"
        handleEditClick={noop}
      >
        {renderChildren && renderChildren()}
      </SummaryGroup>
    </React.Fragment>
  );
};

export default PropertyDetails;
