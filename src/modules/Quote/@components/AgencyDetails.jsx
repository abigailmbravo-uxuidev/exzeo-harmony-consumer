import React, { useState } from 'react';
import SummaryGroup from './SummaryGroup';
import { noop } from '@exzeo/core-ui/src';

const AgencyDetails = ({ renderChildren }) => {
  const [confirmAgency, setConfirmAgency] = useState(false);

  return (
    <React.Fragment>
      <SummaryGroup
        header="Agency Details"
        detailClass="agency-details"
        switchName="confirmAgency"
        switchValue={confirmAgency}
        switchOnChange={value => setConfirmAgency(value)}
        handleEditClick={noop}
      >
        {renderChildren && renderChildren()}
      </SummaryGroup>
    </React.Fragment>
  );
};

export default AgencyDetails;
