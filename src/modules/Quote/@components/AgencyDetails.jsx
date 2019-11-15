import React from 'react';
import SummaryGroup from './SummaryGroup';
import { noop, SectionLoader } from '@exzeo/core-ui/src';
import { useAgencyInfo } from '@exzeo/core-ui/src/@Harmony';
import { normalize } from '@exzeo/core-ui/src/Utilities';

const AgencyDetails = ({ initialValues }) => {
  const { loaded, agency } = useAgencyInfo(initialValues.agencyCode);

  if (!loaded) {
    return <SectionLoader />;
  }

  return (
    <React.Fragment>
      <SummaryGroup
        header="Agency Details"
        detailClass="agency-details"
        name="confirmAgency"
        link="save"
        handleEditClick={noop}
      >
        <React.Fragment>
          <dl className="agent">
            <div>
              <dt>Agency</dt>
              <dd>{agency.displayName}</dd>
            </div>
          </dl>
          <dl className="agent">
            <div>
              <dt>Agency Address</dt>
              <dd>{agency.physicalAddress.address1}</dd>
              <dd>{`${agency.physicalAddress.city}, ${agency.physicalAddress.state}  ${agency.physicalAddress.zip}`}</dd>
            </div>
          </dl>
          <dl className="agent">
            <div>
              <dt>Agency Email</dt>
              <dd>{agency.customerServiceEmailAddress}</dd>
            </div>
          </dl>
          <dl className="agent">
            <div>
              <dt>Phone Number</dt>
              <dd>{normalize.phone(agency.primaryPhoneNumber)}</dd>
            </div>
          </dl>
        </React.Fragment>
      </SummaryGroup>
    </React.Fragment>
  );
};

export default AgencyDetails;
