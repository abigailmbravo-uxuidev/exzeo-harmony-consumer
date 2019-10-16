import React, { useState, useEffect } from 'react';
import SummaryGroup from './SummaryGroup';
import { noop, SectionLoader } from '@exzeo/core-ui/src';
import { searchAgencies } from '@exzeo/harmony-core';

const AgencyDetails = ({ initialValues }) => {
  const [confirmAgency, setConfirmAgency] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getAgency() {
      setLoaded(false);
      const result = await searchAgencies({
        agencyCode: initialValues.agencyCode
      });

      setSelectedAgency(result[0]);
      setLoaded(true);
    }

    getAgency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues.agencyCode]);

  if (!loaded) {
    return <SectionLoader />;
  }

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
        <dl className="agent">
          <div>
            <dt>Agency</dt>
            <dd>{selectedAgency.displayName}</dd>
          </div>
        </dl>
      </SummaryGroup>
    </React.Fragment>
  );
};

export default AgencyDetails;
