import React from 'react';
import SummaryGroup from './SummaryGroup';
import { noop, SectionLoader } from '@exzeo/core-ui/src';
import { useAgencyInfo } from '@exzeo/core-ui/src/@Harmony';

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
        <dl className="agent">
          <div>
            <dt>Agency</dt>
            <dd>{agency.displayName}</dd>
          </div>
        </dl>
      </SummaryGroup>
    </React.Fragment>
  );
};

export default AgencyDetails;
